import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';
import { Actions, createEffect, Effect, ofType } from '@ngrx/effects';

import { of, Observable } from 'rxjs';
import { mergeMap, tap, map } from 'rxjs/operators';

import { select, Store } from '@ngrx/store';
import * as fromStore from '../../../core/store/app.reducer';
import { FirebaseService } from '../../../core/firebase/firebase.service';
import { EffectsHelpers } from '../../../core/store/effects.helpers';
import { OnboardingState } from './onboarding.state';

import { ActionFlow, RouterNavigate, LoadAction, Unsubscribe } from '../../../core/store/app.actions';
import { OnboardingActionTypes, Cleanup, LoadData } from './onboarding.actions';

@Injectable()
export class OnboardingEffects {

  loadId = this.db.createId();

  /** Load data from Firebase. */
  loadData$: Observable<Action> = createEffect(
    () => this.actions$.pipe(
      ofType<LoadData>(OnboardingActionTypes.LOAD_DATA),
      mergeMap((action: LoadData) => {
        return [
        ];
      }),
    ),
  );

  /** Unsubscribe connections from Firebase. */
  cleanup$: Observable<Action> = createEffect(
    () => this.actions$.pipe(
      ofType<Cleanup>(OnboardingActionTypes.CLEANUP),
      map((action: Cleanup) => new Unsubscribe(this.loadId)),
    ),
  );

  constructor(
    private actions$: Actions,
    private store: Store<fromStore.State>,
    private state: OnboardingState,
    private db: FirebaseService,
    private eh: EffectsHelpers,
  ) {}
}
