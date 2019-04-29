import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import { from, of, merge, Observable, ConnectableObservable, BehaviorSubject } from 'rxjs';
import { mergeMap, skip, filter, tap, scan, publishReplay, refCount, shareReplay, map, take } from 'rxjs/operators';
import { Store, select } from '@ngrx/store';
import * as fromStore from '../store/app.reducer';
import * as fromAuth from '../store/auth/auth.reducer';
import * as firebase from 'firebase/app';
import { MockDBService } from './mock-db.service';
import { environment } from '../../../environments/environment';

// Entity Models
import { CalendarEvent } from '../store/calendar-event/calendar-event.model';
import { WeekGoal } from '../store/week-goal/week-goal.model';
import { QuarterGoal } from '../store/quarter-goal/quarter-goal.model';
import { User } from '../store/user/user.model';

export interface MockDBChanges {
  [id: string]: BehaviorSubject<Array<{ type: string, result: any, original?: any }>>;
};

export interface MockDB {
  [id: string]: Observable<{ [id: string]: any }>;
};

@Injectable({
  providedIn: 'root'
})
export class FirebaseMockService {

  mockDB: MockDB;
  mockDBChanges: MockDBChanges;
  mockAfUser: any;

  reducer = (entities, changes) => {
    for (let c of changes) {
      switch (c.type) {
        case 'added': 
          entities[c.result.__id] = c.result;
          break;
        case 'modified':
          entities[c.result.__id] = Object.assign({}, entities[c.result.__id], c.result);
          break;
        case 'removed':
          delete entities[c.result.__id]
          break;
      }
    }

    return entities;
  }

  constructor(
    private db: AngularFirestore, 
    private afAuth: AngularFireAuth, 
    private store: Store<fromStore.State>,
    private mockDBService: MockDBService,
  ) { 
    this.mockAfUser = new BehaviorSubject<any>(undefined);
    
    // Essentially mocking stateChanges in Firebase
    this.mockDBChanges = {
      'calendarEvents': new BehaviorSubject<Array<{ type: string, result: CalendarEvent }>>(this.mockDBService.getInitialDBStateChanges('calendarEvents')),
      'weekGoals': new BehaviorSubject<Array<{ type: string, result: WeekGoal }>>(this.mockDBService.getInitialDBStateChanges('weekGoals')),
      'quarterGoals': new BehaviorSubject<Array<{ type: string, result: QuarterGoal }>>(this.mockDBService.getInitialDBStateChanges('quarterGoals')),
      'users': new BehaviorSubject<Array<{ type: string, result: User }>>(this.mockDBService.getInitialDBStateChanges('users')),
    };

    // Create the mockDB (valueChanges) by scanning the stateChanges
    this.mockDB = {};
    for (let collection in this.mockDBChanges) {
      if (this.mockDBChanges.hasOwnProperty(collection)) {

        const valChangeObs$ = this.mockDBChanges[collection].pipe(scan(this.reducer, {}), publishReplay(1)) as ConnectableObservable<any>;

        // Connect now rather than waiting for first subscription otherwise could miss initial values
        valChangeObs$.connect();
        this.mockDB[collection] = valChangeObs$;
      }
    }

    // Auto login if applicable
    if (environment.autoLoginInDev) {
      const afUser = this.mockDBService.currentUser();
      this.mockAfUser.next(afUser);
      this.loadCurrentUserData(afUser);
    }
  }
 
  afUser = () => {

    // TODO: Remove when refactor to separate module that overrides providing of 
    // FirebaseNgrxService in future
    if (environment.mockAuthInDev) {
      return this.mockAfUser.asObservable();
    } else {
      return this.afAuth.user;
    }
  }
  
  private loadCurrentUserData = (afUser) => {
    for (let collection in this.mockDBChanges) {
      if (this.mockDBChanges.hasOwnProperty(collection)) {
        this.mockDBChanges[collection].next(this.mockDBService.getCurrentUserDBStateChanges(collection, afUser.uid));
      }
    }
  }

  login = (providerId, scope?: string): Observable<any> => {
    
    // TODO: Remove when refactor to separate module that overrides providing of 
    // FirebaseNgrxService in future
    if (environment.mockAuthInDev) {
      const afUser = this.mockDBService.currentUser()
      this.mockAfUser.next(afUser);
      this.loadCurrentUserData(afUser);

      return of({
        credential: { providerId: providerId, accessToken: 'faketoken' },
        user: afUser
      }).pipe(
        mergeMap(results => {
          return this.queryObjOnce<User>('users', results.user.uid).pipe(
            map(dbUser => Object.assign({}, results, { dbUser }))
          )
        })
      );
    }

    let provider = this.getProvider(providerId, scope);

    if (provider) {
      return from(this.afAuth.auth.signInWithPopup(provider)).pipe(
        mergeMap(results => {
          this.loadCurrentUserData(results.user);
          return this.queryObjOnce<User>('users', results.user.uid).pipe(
            map(dbUser => {
              return Object.assign({}, results, { dbUser })
            })
          )
        })
      );
    } else {
      return of(undefined);
    }
  }

  private getProvider(providerId, scope?: string) {
    let provider;
    switch (providerId) {
      case 'google.com': {
        provider = new firebase.auth.GoogleAuthProvider();
        break;
      }
      case 'github.com': {
        provider = new firebase.auth.GithubAuthProvider();
        break;
      }
    }
    if (provider && scope) {
      provider.addScope(scope);
    }
    return provider;
  }

  loginLink = (error) => {
    return;
  }

  logout = (): Observable<any> => {
    
    // TODO: Remove when refactor to separate module that overrides providing of 
    // FirebaseNgrxService in future
    if (environment.mockAuthInDev) {
      this.mockAfUser.next(undefined)
    }

    return from(this.afAuth.auth.signOut());
  }

  queryObjValueChanges = <T>(collection: string, id: string) => {
    return this.mockDB[collection].pipe(
      map(entities => entities[id])
    );
  }
  
  queryObjOnce = <T>(collection: string, id: string): Observable<T> => {
    return this.queryObjValueChanges<T>(collection, id).pipe(take(1));
  }

  queryListStateChanges = <T>(collection, queryParams, queryOptions?): Observable<Array<{ type: string, result: T, original?: T }>> => {
    
    if (queryParams.length === 0) {
      return this.queryListValueChanges<T>(collection, queryParams, queryOptions).pipe(
        take(1),
        mergeMap(entities => {
          return merge(
            of(entities.map(e => ({ type: 'added', result: e }))),
            this.mockDBChanges[collection].asObservable().pipe(skip(1))
          );
        }),
      )
    } else {
      return this.queryListValueChanges<T>(collection, queryParams, queryOptions).pipe(
        take(1),
        mergeMap(entities => {
          return merge(
            of(entities.map(e => ({ type: 'added', result: e }))),
            this.mockDBChanges[collection].asObservable().pipe(
              skip(1),
              map(changes => {
                // Filter out changes relevant for our query
                return changes.filter(change => {
                  // We need to check if the query filters match the entity being changed. For a 'modified'
                  // change, we need to check a match on either the original or updated entity
                  let toCheck = [change.result];
                  if (change.type === 'modified') {
                    toCheck.push(change.original);
                  }
                  
                  // Looks for the first failed filter. If there exists any, 
                  // return false (filter it out)
                  return !queryParams.find(f => {
                    let [key, rel, val] = f;

                    // currently, we handle '==' and 'in'.
                    switch (rel) {
                      case '==':
                        return !(toCheck.find(e => val === e[key]));

                      case 'in':
                        return !(toCheck.find(e => val.find(v => e[key] === v)));

                      default:
                        return false;
                    }
                  })
                })
              })
            )
          );
        }),
      )
    }
  }

  queryListValueChanges = <T>(collection, queryParams, queryOptions?): Observable<T[]> => {

    return this.mockDB[collection].pipe(
      map(entities => {
        let filteredEntities = [];

        // If the first entry is filtering by '__id', we process that first
        // since it is more efficient. Otherwise, start with the full list.
        if (queryParams && queryParams[0] && queryParams[0][0] === '__id') {
          switch (queryParams[0][1]) {
            case '==': {
              filteredEntities.push(entities[queryParams[0][2]]);
              break;
            }
            case 'in': {
              // We are using loop syntax instead of map so that we can exit
              // early if a desired entity has not been loaded into store.
              const uniqueIds = queryParams[0][2].filter((x, i, a) => a.indexOf(x) === i);
              for (let id of uniqueIds) {
                if (!entities[id]) {
                  return undefined;
                } else {
                  filteredEntities.push(entities[id]);
                }
              }
              break;
            }
          }
        } else {
          filteredEntities = Object.keys(entities).map(id => entities[id]);
        }

        if (queryParams) {

          
          // Then process the remaining filters.
          filteredEntities = filteredEntities.filter(e => {

            // Looks for the first failed filter. If there exists any, 
            // return false (filter it out)
            return !queryParams.find(f => {
              let [key, rel, val] = f;

              // already processed '__id' so always passes this filter
              if (key === '__id') { return false; }

              // currently, we handle '==' and 'in'.
              switch (rel) {
                case '==':
                  return !(val === e[key]);

                case 'in':
                  return !(val.find(v => e[key] === v));

                default:
                  return false;
              }
            })
          })
        }

        return filteredEntities;
      })
    );
  }

  queryListOnce = <T>(collection, queryParams, queryOptions?): Observable<T[]> => {
    return this.queryListValueChanges<T>(collection, queryParams, queryOptions).pipe(take(1));
  }
  
  addEntity = (collection, entity) => {

    this.mockDBChanges[collection].next([{
      type: 'added',
      result: Object.assign({}, entity, {
        _createdAt: firebase.firestore.Timestamp.now(),
        _updatedAt: firebase.firestore.Timestamp.now()
      })
    }]);

    return of(undefined);
  }

  updateEntity = (collection, id, changes) => {

    return this.mockDB[collection].pipe(
      map(entities => {
        let original = entities[id];
        return [original, Object.assign({}, original, changes)];
      }),
      take(1),
      tap(([original, entity]) => {
        this.mockDBChanges[collection].next([{
          type: 'modified',
          result: Object.assign({}, entity, {
            _updatedAt: firebase.firestore.Timestamp.now()
          }),
          original: original
        }]);
      }),
      map(entity => undefined)
    );
  }

  upsertEntity = (collection, entity): Observable<{ type: string, value: any }> => {
    
    return from((async() => {
      const dbEntity = await this.queryObjOnce(collection, entity.__id).toPromise();
      if (dbEntity) {
        return {
          type: 'update',
          value: await this.updateEntity(collection, entity.__id, entity)
        };
      } else {
        return {
          type: 'add',
          value: await this.addEntity(collection, entity)
        };
      }
    })());
  }

  removeEntity = (collection, id) => {
    
    return this.mockDB[collection].pipe(
      map(entities => entities[id]),
      take(1),
      tap(entity => {
        this.mockDBChanges[collection].next([{
          type: 'removed',
          result: entity
        }]);
      }),
      map(entity => undefined)
    );
  }
}
