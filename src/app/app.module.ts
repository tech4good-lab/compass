import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { SandboxRoutingModule } from './sandbox-routing.module';

// General Modules
import { CoreModule } from './core/core.module';
import { SharedModule } from './shared/shared.module';

// Feature Modules
import { MainModule } from './main/main.module';
import { GeneralModule } from './general/general.module';
import { AngularFirestoreModule } from '@angular/fire/firestore';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    CoreModule,
    SharedModule,
    SandboxRoutingModule,
    // Feature Modules
    MainModule,
    GeneralModule,
    // Routing Module
    AppRoutingModule,
    AngularFirestoreModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }