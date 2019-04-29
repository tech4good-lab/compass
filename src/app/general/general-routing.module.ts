import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Containers
import { LoadingComponent } from './loading/loading.component';
import { CompletedComponent } from './completed/completed.component';
import { E404Component } from './e404/e404.component';
import { LoginComponent } from './login/login.component';

const routes: Routes = [
  { path: 'loading', component: LoadingComponent },
  { path: 'completed', component: CompletedComponent },
  { path: '404', component: E404Component },
  { path: 'login', component: LoginComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GeneralRoutingModule { }