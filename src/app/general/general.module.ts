import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EffectsModule } from '@ngrx/effects';
import { SharedModule } from '../shared/shared.module';
import { GeneralRoutingModule } from './general-routing.module';

// Containers
import { E404Component } from './e404/e404.component';
import { LoginComponent } from './login/login.component';

// Components

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    GeneralRoutingModule,
    EffectsModule.forFeature([
    ])
  ],
  declarations: [
    // Containers
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