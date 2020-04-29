import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Containers
import { ReorientComponent } from './reorient/reorient.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NewWeekComponent } from './dashboard/new-week/new-week.component';

const routes: Routes = [
  { path: 'new-week', component: NewWeekComponent },
  { path: 'reorient', component: ReorientComponent },
  { path: 'dashboard', component: DashboardComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainRoutingModule { }