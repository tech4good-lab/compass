import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';
import { Actions, ofType } from '@ngrx/effects';
import { select, Store } from '@ngrx/store';
import * as fromStore from './app.reducer';
import { Observable, pipe, forkJoin } from 'rxjs';
import { reduce, filter, mergeMap, map, take, first } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class EffectsHelpers {

  constructor(private actions$: Actions, private store: Store<fromStore.State>) {}

  /**
   * aggregates multiple actions together based on a calculated actionTypeArray
   * (computed from the passed in function applied to the original action) and
   * the correlationId
   */
  aggregate = <A, R extends Action>(fn: (o: A) => Array<string|string[]>, correlationId: string) => pipe(
    mergeMap<A, Observable<R[]>>(origAction => {
      const actionTypeArray = fn(origAction);
      let actionObs = actionTypeArray.map(at => {
        return this.actions$.pipe(
          Array.isArray(at) ? ofType(...at) : ofType(at),
          this.hasCorrelationId(correlationId),
          first()
        );
      });
      return forkJoin(...actionObs);
    })
  );
 
  /**
   * enriches the original content in the event stream with the result from contentFn's
   * returned the observable when it is applied to the original content.
   */
  enrich = <A, P extends object>(contentFn$: (o: A) => Observable<P>) => pipe(
    mergeMap<A, Observable<A & { payload: P }>>(orig => {

      // payload may not be defined on this Action
      const payload = orig['payload'] || { };

      return contentFn$(orig).pipe(
        take(1),
        map<P, A & { payload: P }>(c => Object.assign({}, orig, {
          payload: { ...payload, ...(c as object) }
        }))
      )
    })
  );

  /** Filter to Actions with specified correlationId(s). */
  hasCorrelationId = <T extends Action>(correlationIds: string | string[]) => pipe(
    // Use hash syntax since correlationId may not be defined on this Action
    filter<T>(origAction => {
      if (!Array.isArray(correlationIds)) {
        return origAction['correlationId'] === correlationIds;
      } else {
        return correlationIds.includes(origAction['correlationId']);
      }
    })
  );
}
