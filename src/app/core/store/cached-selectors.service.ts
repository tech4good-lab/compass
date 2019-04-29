import { Injectable } from '@angular/core';
import { MemoizedSelector, createSelector, createFeatureSelector } from '@ngrx/store';
import { EntityState } from '@ngrx/entity';
import { Store, select } from '@ngrx/store';
import * as fromStore from '../../core/store/app.reducer';
import { pluck, tap, map, switchMap, filter } from 'rxjs/operators';
import { Observable, of, combineLatest } from 'rxjs';
import { FirebaseService } from '../firebase/firebase.service';

export interface CachedSelector<T> {
  hashKey: string;
  selector: MemoizedSelector<fromStore.State, T>;
  correlationIds: string[];
}

export enum SelectType {
  OBJECT = 'object',
  LIST = 'list'
}

@Injectable({
  providedIn: 'root'
})
export class CachedSelectorsService {

  /** Store selectors by entityStoreKey. */
  private entityStoreSelectors: { [entityStoreKey: string]: MemoizedSelector<fromStore.State, any> } = {};

  /** Selectors by hashKey. */
  private selectorsByHashKey: { [hashKey: string]: CachedSelector<any> } = {};

  /** Selectors by correlationId. */
  private selectorsByCorrelationId: { [cId: string]: CachedSelector<any>[] } = {};

  /** Any hardcoded data that needs to be merged into observable selected from store. */
  private hardcodedFields = {
  };

  constructor(private store: Store<fromStore.State>,
             private db: FirebaseService) { }
 
  public createId = () => {
    return this.db.createId()
  }

  /** 
   * Define a unique key for each selector.
   * @param queryParams - either a simple id string (for SelectType.OBJECT) or the queryParams array (for SelectType.LIST)
   */
  private getHashKey(selectType: SelectType, entityStoreKey: string, queryParams: string | [string, string, any][]): string {
    return `${selectType}.${entityStoreKey}.${queryParams}`;
  }

  /** Gets a cached selector if one exists.  */
  private getSelector(selectType: SelectType, entityStoreKey: string, queryParams: string | [string, string, any][]): CachedSelector<any> {

    const hashKey = this.getHashKey(selectType, entityStoreKey, queryParams);
    return this.selectorsByHashKey[hashKey];
  }

  /** 
   * Releases all "virtual" selectors with that correlationId.
   * For selectors where this correlationId was the only one, release
   * it in actuality. 
   */
  public release = (correlationId: string) => {

    // Add a 5-second delay so we don't have to reselect multiple times 
    // if the next view happens to use the same selectors
    setTimeout(() => {
      let selectors = this.selectorsByCorrelationId[correlationId];

      // If there are no selectors, just return
      if (!selectors) { return; }

      while (selectors.length > 0) {
        const s = selectors.pop();

        // Remove the correlationId from the list in that selector
        const index = s.correlationIds.findIndex(cId => cId === correlationId);
        s.correlationIds.splice(index, 1);

        // If there are no more correlationIds, then release
        if (s.correlationIds.length === 0) {
          s.selector.release();

          // Update selectorsByHashKey
          this.selectorsByHashKey[s.hashKey] = undefined;
        }
      }
    }, 5000)
  }

  public selectEntityObj = <S, T>(
    entityStoreKey: string,
    id: string,
    correlationId: string,
    childrenFn?: (e: S) => { [index: string]: Observable<any> },
  ): Observable<T> => {
    return this.store.pipe(
      select(this.getEntityObjSelector<S>(entityStoreKey, id, correlationId)),
      // TODO: filter or not? principle is that if it should exist, we shouldn't emit before it's been 
      // loaded into the store. On the other hand, what if the db messes up? could this be fragile?
      filter(val => val !== undefined),
      switchMap(e => {
        if (!e || !childrenFn) {
          return of(e);
        } else {
          let children = childrenFn(e);
          // transform the hash of observables into an array of observable hashes
          let obsArray = Object.keys(children).map(objKey => {
            let obs = children[objKey];
            return obs.pipe(
              map(entity => {
                let obj = {};
                obj[objKey] = entity;
                return obj;
              })
            );
          });
          return obsArray.length === 0 ? of(e) : combineLatest(obsArray).pipe(
            map(array => {
              return Object.assign({}, e, ...array);
            })
          );
        }
      })
    );
  }
 
  public selectEntityList = <S, T>(
    entityStoreKey: string,
    queryParams: [string, string, any][],
    correlationId: string,
    childrenFn?: (e: S) => { [index: string]: Observable<any> },
  ): Observable<Array<T>> => {

    return this.store.pipe(
      select(this.getEntityListSelector<S>(entityStoreKey, queryParams, correlationId)),
      // TODO: filter or not? principle is that if it should exist, we shouldn't emit before it's been 
      // loaded into the store. On the other hand, what if the db messes up? could this be fragile?
      filter(val => val !== undefined),
      switchMap(entities => {
        if (!entities || !childrenFn || entities.length === 0) {
          return of(entities);
        } else {

          return combineLatest(...entities.map(e => {

            // If there are children, then we need to transform the hash of observables into an observable with the data object
            let children = childrenFn(e);

            let obsArray = Object.keys(children).map(objKey => {
              let obs = children[objKey];
              return obs.pipe(map(entity => {
                let obj = {};
                obj[objKey] = entity;
                return obj;
              }));
            });
            return obsArray.length === 0 ? of(e) : combineLatest(obsArray).pipe(
              map(array => {
                return Object.assign({}, e, ...array);
              })
            );
          }));
        }
      })
    );
  }

  /* ----------------   HELPERS  --------------------- */

  private getEntityStoreSelector<T>(
    entityStoreKey: string
  ): (s: fromStore.State) => EntityState<T> {

    let selector = this.entityStoreSelectors[entityStoreKey] ||
      createFeatureSelector<T>(entityStoreKey);

    return selector;
  }

  private getEntityListSelector<T>(
    entityStoreKey: string,
    queryParams: [string, string, any][],
    correlationId: string
  ): (s: fromStore.State) => T[] {

    // get selector
    let cachedSelector = this.getSelector(SelectType.LIST, entityStoreKey, queryParams);

    if (cachedSelector) {
      // if the selector already exists, just need to add correlationId
      // if it doesn't already exist
      if (!cachedSelector.correlationIds.some(cId => cId === correlationId)) {
        cachedSelector.correlationIds.push(correlationId);
        this.selectorsByCorrelationId[correlationId] = this.selectorsByCorrelationId[correlationId] || [];
        this.selectorsByCorrelationId[correlationId].push(cachedSelector);
      }
    } else {
      // if the selector does not exist, create it
      cachedSelector = this.createEntityListSelector<T>(entityStoreKey, queryParams, correlationId);
      this.selectorsByHashKey[cachedSelector.hashKey] = cachedSelector;
      this.selectorsByCorrelationId[correlationId] = this.selectorsByCorrelationId[correlationId] || [];
      this.selectorsByCorrelationId[correlationId].push(cachedSelector);
    } 
    return cachedSelector.selector;
  }

  private createEntityListSelector<T>(
    entityStoreKey: string,
    queryParams: [string, string, any][],
    correlationId: string
  ): CachedSelector<T[]> {
    return {
      hashKey: this.getHashKey(SelectType.LIST, entityStoreKey, queryParams),
      selector: createSelector(
        this.getEntityStoreSelector<T>(entityStoreKey),
        (entityStore) => {
          let val = this.getList<T>(entityStore.entities, queryParams);
          return val.map(e => {
            if (this.hardcodedFields[entityStoreKey]) {
              return Object.assign({}, e, this.hardcodedFields[entityStoreKey][e.__id]);
            } else {
              return e;
            }
          });
        }
      ),
      correlationIds: [correlationId]
    };
  }

  private getList<T>(
    entityHash: { [index: string]: T },
    queryParams: [string, string, any][]
  ): Array<T & { [index: string]: any }> {
    
    let filteredEntities = [];

    let selectIdQueries = queryParams.filter(q => q[0] === '__id' && q[1] === '==');
    let uniqSelectIds = selectIdQueries.map(q => q[2]).filter((q, i, a) => a.indexOf(q) === i);

    if (uniqSelectIds.length === 1 && entityHash[uniqSelectIds[0]]) {
      // Process filter by '__id', '==' first since it is more efficient. 
      filteredEntities.push(entityHash[uniqSelectIds[0]]);
    } else if (uniqSelectIds.length > 1) {
      // If there are more than one select id ==, then there cannot be any matches
      console.log("Is this really what you wanted to query?");
      console.log(queryParams);
      return [];
    } else {
      // Otherwise, start with the full list and filter further.
      filteredEntities = Object.keys(entityHash).map(id => entityHash[id]);
    }

    if (queryParams) {
      
      // Then process the remaining filters.
      filteredEntities = filteredEntities.filter(e => {

        // Looks for the first failed filter. If there exists any, 
        // return false (filter it out)
        return !queryParams.find(f => {
          let [key, rel, val] = f;

          // already processed '__id', '==', so always passes this filter
          if (key === '__id' && rel === '==') { return false; }

          // currently, we handle '==' and 'array_contains'.
          switch (rel) {
            case '==':
              return !(e[key] === val);
            
            case '>=':
              return !(e[key] >= val);
            
            case '<=':
              return !(e[key] <= val);
            
            case '>':
              return !(e[key] > val);
            
            case '<':
              return !(e[key] < val);

            case 'array_contains':
              return !(e[key].find(ev => ev === val));

            default:
              return false;
          }
        })
      })
    }

    return filteredEntities;
  }

  private getEntityObjSelector<T>(
    entityStoreKey: string,
    id: string,
    correlationId: string
  ): (s: fromStore.State) => T {

    // get selector
    let cachedSelector = this.getSelector(SelectType.OBJECT, entityStoreKey, id);

    if (cachedSelector) {
      // if the selector already exists, just need to add correlationId
      // if it doesn't already exist
      if (!cachedSelector.correlationIds.some(cId => cId === correlationId)) {
        cachedSelector.correlationIds.push(correlationId);
        this.selectorsByCorrelationId[correlationId] = this.selectorsByCorrelationId[correlationId] || [];
        this.selectorsByCorrelationId[correlationId].push(cachedSelector);
      }
    } else {
      // if the selector does not exist, create it
      cachedSelector = this.createEntityObjSelector<T>(entityStoreKey, id, correlationId);
      this.selectorsByHashKey[cachedSelector.hashKey] = cachedSelector;
      this.selectorsByCorrelationId[correlationId] = this.selectorsByCorrelationId[correlationId] || [];
      this.selectorsByCorrelationId[correlationId].push(cachedSelector);
    } 
    return cachedSelector.selector;
  }

  private createEntityObjSelector<T>(
    entityStoreKey: string,
    id: string,
    correlationId: string
  ): CachedSelector<T> {
    return {
      hashKey: this.getHashKey(SelectType.OBJECT, entityStoreKey, id),
      selector: createSelector(
        this.getEntityStoreSelector<T>(entityStoreKey),
        (entityStore) => {
          let e = this.getObj<T>(entityStore.entities, id);
          if (e && this.hardcodedFields[entityStoreKey]) {
            return Object.assign({}, e, this.hardcodedFields[entityStoreKey][e.__id]);
          } else {
            return e;
          }
        }
      ),
      correlationIds: [correlationId]
    };
  }

  private getObj<T>(
    entityHash: { [index: string]: T },
    id: string
  ): T & { [index: string]: any } {

    return entityHash[id];
  }
}