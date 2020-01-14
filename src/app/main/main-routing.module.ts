import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Containers
import { OnboardingComponent } from './onboarding/onboarding.component';
import { ReorientComponent } from './reorient/reorient.component';
import { DashboardComponent } from './dashboard/dashboard.component';

const routes: Routes = [
  { path: 'onboarding', component: OnboardingComponent },
  { path: 'reorient', component: ReorientComponent },
  { path: 'dashboard', component: DashboardComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainRoutingModule { }