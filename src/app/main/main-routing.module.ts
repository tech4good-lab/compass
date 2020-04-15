import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Containers
import { ReorientComponent } from './reorient/reorient.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NewQuarterComponent } from './dashboard/new-quarter/new-quarter.component';

const routes: Routes = [
  { path: 'new-quarter', component: NewQuarterComponent },
  { path: 'reorient', component: ReorientComponent },
  { path: 'dashboard', component: DashboardComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainRoutingModule { }