import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Action } from '@ngrx/store';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { of, Observable } from 'rxjs';
import { tap, filter, mergeMap, map, first } from 'rxjs/operators';
import { pipe, forkJoin } from 'rxjs';
import { EffectsHelpers } from './effects.helpers';
import { FirebaseService } from '../firebase/firebase.service';
import { Store } from '@ngrx/store';
import * as fromStore from './app.reducer';

import { GeneralActionTypes, Unsubscribe, ActionFlow, RouterNavigate } from './app.actions';
import { CachedLoadConnectionsService } from './cached-load-connections.service';

@Injectable()
export class AppEffects {

  @Effect({ dispatch: false })
  routerNavigate$: Observable<Action> = this.actions$.pipe(
    ofType(GeneralActionTypes.ROUTER_NAVIGATE),
    tap((action: RouterNavigate) => {
      this.router.navigate(action.commands, action.extras);
    })
  )

  @Effect({ dispatch: false })
  unsubscribe$: Observable<Action> = this.actions$.pipe(
    ofType(GeneralActionTypes.UNSUBSCRIBE),
    tap((action: Unsubscribe) => {
      this.cachedConnections.disconnect(action);
    })
  )

  @Effect()
  actionFlow$: Observable<Action> = this.actions$.pipe(
    ofType<ActionFlow>(GeneralActionTypes.ACTION_FLOW),
    // should have at least one action
    filter(af => af.actionTuples.length > 0),
    mergeMap((actionFlow: ActionFlow) => {

      let actions = [];
      let responseFilters = [];

      for (let tuple of actionFlow.actionTuples) {
        const correlationId = this.db.createId();
        // Add action
        tuple[0]['correlationId'] = correlationId;
        actions.push(tuple[0]);
        this.store.dispatch(tuple[0]);

        // Add filter based on success and fail action types and correlationId
        if (tuple[1] || tuple[2]) {
          responseFilters.push({ 
            successActionType: tuple[1], 
            failActionType: tuple[2], 
            correlationId 
          });
        }
      }

      const responseObsArr = responseFilters.map(rf => {
        let filterTypes = [];
        if (Array.isArray(rf.successActionType)) {
          filterTypes = rf.successActionType;
        } else if (rf.successActionType) {
          filterTypes = [rf.successActionType];
        }

        if (Array.isArray(rf.failActionType)) {
          filterTypes = [...filterTypes, ...rf.failActionType];
        } else if (rf.failActionType) {
          filterTypes.push(rf.failActionType);
        }
          
        // listen for either success or fail action
        return this.actions$.pipe(
          ofType(...filterTypes),
          this.eh.hasCorrelationId(rf.correlationId),
          first(),
          map(responseAction => {
            if ((Array.isArray(rf.successActionType) && rf.successActionType.includes(responseAction.type)) || responseAction.type === rf.successActionType) {
              return { isSuccess: true, action: responseAction };
            } else {
              return { isSuccess: false, action: responseAction };
            }
          })
        );
      });

      if (responseObsArr.length === 0) {
        // If there are no actions, just run the success callback
        return actionFlow.successActionFn([], []);
      } else {
        return forkJoin(...responseObsArr).pipe(
          mergeMap(responses => {
            if (responses.some(r => !r.isSuccess)) {
              return actionFlow.failActionFn(actions, responses.map(r => r.action));
            } else {
              return actionFlow.successActionFn(actions, responses.map(r => r.action));
            }
          })
        );
      }
    })
  )

  constructor(private actions$: Actions, private router: Router, private cachedConnections: CachedLoadConnectionsService, private eh: EffectsHelpers, private db: FirebaseService, private store: Store<fromStore.State>) {}
}