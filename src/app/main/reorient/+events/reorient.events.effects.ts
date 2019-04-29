import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';
import { Actions, Effect, ofType } from '@ngrx/effects';

import { Observable } from 'rxjs';
import { mergeMap, map } from 'rxjs/operators';

import { select, Store } from '@ngrx/store';
import * as fromStore from '../../../core/store/app.reducer';
import { FirebaseService } from '../../../core/firebase/firebase.service';
import { EffectsHelpers } from '../../../core/store/effects.helpers';

import { ActionFlow, RouterNavigate } from '../../../core/store/app.actions';
import { ReorientEventsActionTypes } from './reorient.events.actions';

@Injectable()
export class ReorientEventsEffects {

  constructor(
    private actions$: Actions, 
    private store: Store<fromStore.State>, 
    private db: FirebaseService, 
    private eh: EffectsHelpers
  ) { }
}