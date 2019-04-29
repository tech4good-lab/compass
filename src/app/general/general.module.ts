import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EffectsModule } from '@ngrx/effects';
import { SharedModule } from '../shared/shared.module';
import { GeneralRoutingModule } from './general-routing.module';

// Containers
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
      CompletedStateEffects,
      CompletedEventsEffects,
    ])
  ],
  declarations: [
    // Containers
    CompletedComponent,
    E404Component,
    LoginComponent,
    // Components
  ],
  entryComponents: [
  ],
  exports: [
  ]
})
export class GeneralModule { }