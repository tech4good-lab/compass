import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Containers
import { ReorientComponent } from './reorient/reorient.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SchedulingCardComponent } from './reorient/scheduling-card/scheduling-card.component';

const routes: Routes = [
  { path: 'scheduling-card', component: SchedulingCardComponent },
  { path: 'reorient', component: ReorientComponent },
  { path: 'dashboard', component: DashboardComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainRoutingModule { }