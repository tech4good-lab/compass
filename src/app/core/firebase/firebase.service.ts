import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import { Observable, merge, of, from, pipe } from "rxjs";
import { tap, pluck, mergeMap, filter, takeUntil, skip, switchMap, map, take } from 'rxjs/operators';
import * as firebase from 'firebase/app';
import { environment } from '../../../environments/environment';
import { FirebaseMockService } from './firebase.mock.service';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  constructor(
    private afStore: AngularFirestore,
    private afAuth: AngularFireAuth,
    private mockService: FirebaseMockService,
  ) { }

  /** Creates a unique id */
  createId = (): string => {
    return this.afStore.createId();
  }

  afUser = () => {

    // TODO: Remove when refactor to separate module that overrides providing of 
    // FirebaseNgrxService in future
    if (!environment.production && environment.mockDataInDev && environment.mockAuthInDev) {
      return this.mockService.afUser();
    }

    return this.afAuth.user;
  }
  
  login = (providerId, scope?: string): Observable<any> => {
    // TODO: Remove when refactor to separate module that overrides providing of 
    // FirebaseNgrxService in future
    if (!environment.production && environment.mockDataInDev) {
      return this.mockService.login(providerId, scope);
    }

    let provider = this.getProvider(providerId, scope);

    if (provider) {
      return from(this.afAuth.auth.signInWithPopup(provider)).pipe(
        mergeMap(results => {
          return this.queryObjOnce('users', results.user.uid).pipe(
            map(dbUser => Object.assign({}, results, { dbUser }))
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
    // TODO: Remove when refactor to separate module that overrides providing of
    // FirebaseNgrxService in future
    if (!environment.production && environment.mockAuthInDev) {
      return this.mockService.loginLink(error);
    }

    firebase.auth().fetchSignInMethodsForEmail(error.email)
      .then(providers => {
        this.queryListOnce('users', [['email', '==', error.email]]).subscribe(users => {
          firebase.auth().signInWithPopup(this.getProvider(providers[0])).then(auth1 => {
            firebase.auth().signInAndRetrieveDataWithCredential(auth1.credential)
              .then(auth2 => {
                auth2.user.linkAndRetrieveDataWithCredential(error.credential)
              })
            .catch(error2 => console.log(error2));
          });
        });
      });
  }

  logout = (): Observable<any> => {
    
    // TODO: Remove when refactor to separate module that overrides providing of 
    // FirebaseNgrxService in future
    if (!environment.production && environment.mockDataInDev) {
      return this.mockService.logout();
    }

    return from(this.afAuth.auth.signOut());
  }

  queryObjValueChanges = <T>(collection: string, id: string) => {
    // TODO: Remove when refactor to separate module that overrides providing of 
    // FirebaseNgrxService in future
    if (!environment.production && environment.mockDataInDev) {
      return this.mockService.queryObjValueChanges<T>(collection, id);
    }

    return this.afStore.doc<T>(`/${collection}/${id}`).valueChanges();
  }

  queryObjOnce = <T>(collection: string, id: string): Observable<T> => {
    // TODO: Remove when refactor to separate module that overrides providing of 
    // FirebaseNgrxService in future
    if (!environment.production && environment.mockDataInDev) {
      return this.mockService.queryObjOnce<T>(collection, id);
    }

    return this.queryObjValueChanges<T>(collection, id).pipe(take(1));
  }

  queryListStateChanges = <T>(collection, queryParams, queryOptions?) => {
    
    // TODO: Remove when refactor to separate module that overrides providing of 
    // FirebaseNgrxService in future
    if (!environment.production && environment.mockDataInDev) {
      return this.mockService.queryListStateChanges<T>(collection, queryParams, queryOptions);
    }

    let stateChangeObs$;

    if (queryParams.length === 0) {
      stateChangeObs$ = this.afStore.collection<T>(`/${collection}`).stateChanges();
    } else {
      stateChangeObs$ = this.afStore.collection<T>(
        `/${collection}`, 
        this.constructQueryListRef(queryParams, queryOptions)
      ).stateChanges();
    }

    return stateChangeObs$.pipe(
      map((changes: any[]) => {

        return changes.map(change => {
          return {
            type: change.type,
            result: change.payload.doc.data()
          }
        });
      })
    );
  }
  
  queryListValueChanges = <T>(collection, queryParams, queryOptions?) => {

    // TODO: Remove when refactor to separate module that overrides providing of 
    // FirebaseNgrxService in future
    if (!environment.production && environment.mockDataInDev) {
      return this.mockService.queryListValueChanges<T>(collection, queryParams, queryOptions);
    }

    if (queryParams.length === 0) {
      return this.afStore.collection<T>(`/${collection}`).valueChanges();
    } else {
      return this.afStore.collection<T>(
        `/${collection}`, 
        this.constructQueryListRef(queryParams, queryOptions)
      ).valueChanges();
    }
  }

  private constructQueryListRef = (queryParams, queryOptions?) => (ref) => {
    let refWithQueries = queryParams.reduce((func, query) => {
      const [prop, comp, val] = query;
      return func.where(prop, comp, val);
    }, ref);
    if (!queryOptions) { queryOptions = {}; }
    return Object.keys(queryOptions).reduce((func, queryKey) => {
      switch (queryKey) {
        case 'orderBy': {
          if (Array.isArray(queryOptions.orderBy)) {
            return func.orderBy(...queryOptions.orderBy);
          } else {
            return func.orderBy(queryOptions.orderBy);
          }
        }
        case 'limit':
          return func.limit(queryOptions.limit);

        case 'startAt':
          return func.startAt(queryOptions.startAt);

        case 'startAfter':
          return func.startAfter(queryOptions.startAfter);

        case 'endAt':
          return func.endAt(queryOptions.endAt);

        case 'endBefore':
          return func.endBefore(queryOptions.endBefore);

        default:
          return func;
      }
    }, refWithQueries);
  }

  queryListOnce = <T>(collection, queryParams, queryOptions?): Observable<T[]> => {
    
    // TODO: Remove when refactor to separate module that overrides providing of 
    // FirebaseNgrxService in future
    if (!environment.production && environment.mockDataInDev) {
      return this.mockService.queryListOnce<T>(collection, queryParams, queryOptions);
    }

    return this.queryListValueChanges<T>(collection, queryParams, queryOptions).pipe(take(1));
  }

  addEntity = (collection, entity) => {
    // TODO: Remove when refactor to separate module that overrides providing of 
    // FirebaseNgrxService in future
    if (!environment.production && environment.mockDataInDev) {
      return this.mockService.addEntity(collection, entity);
    }

    return from(this.afStore.doc(`/${collection}/${entity.__id}`).set(Object.assign({}, entity, {
      _createdAt: firebase.firestore.Timestamp.now(),
      _updatedAt: firebase.firestore.Timestamp.now()
    })))
  }

  updateEntity = (collection, id, changes) => {
    
    // TODO: Remove when refactor to separate module that overrides providing of 
    // FirebaseNgrxService in future
    if (!environment.production && environment.mockDataInDev) {
      return this.mockService.updateEntity(collection, id, changes);
    }

    return from(this.afStore.doc(`/${collection}/${id}`).update(Object.assign({}, changes, {
      _updatedAt: firebase.firestore.Timestamp.now()
    })))
  }

  upsertEntity = (collection, entity): Observable<{ type: string, value: any }> => {
    
    // TODO: Remove when refactor to separate module that overrides providing of 
    // FirebaseNgrxService in future
    if (!environment.production && environment.mockDataInDev) {
      return this.mockService.upsertEntity(collection, entity);
    }

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
    
    // TODO: Remove when refactor to separate module that overrides providing of 
    // FirebaseNgrxService in future
    if (!environment.production && environment.mockDataInDev) {
      return this.mockService.removeEntity(collection, id);
    }

    return from(this.afStore.doc(`/${collection}/${id}`).delete())
  }
}
