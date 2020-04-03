import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EffectsModule } from '@ngrx/effects';
import { SharedModule } from '../shared/shared.module';
import { GeneralRoutingModule } from './general-routing.module';

// Containers
import { LoadingComponent } from './loading/loading.component';
import { LoadingEventsEffects } from './loading/+events/loading.events.effects';
import { LoadingStateEffects } from './loading/+state/loading.state.effects';
import { CompletedComponent } from './completed/completed.component';
import { CompletedEventsEffects } from './completed/+events/completed.events.effects';
import { CompletedStateEffects } from './completed/+state/completed.state.effects';
import { E404Component } from './e404/e404.component';
import { LoginComponent } from './login/login.component';

// Components

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    GeneralRoutingModule,
    EffectsModule.forFeature([
      LoadingStateEffects,
      LoadingEventsEffects,
      CompletedStateEffects,
      CompletedEventsEffects,
    ])
  ],
  declarations: [
    // Containers
    LoadingComponent,
    CompletedComponent,
    E404Component,
    LoginComponent,
    // Components
  ],
  exports: [
  ]
})
export class GeneralModule { }