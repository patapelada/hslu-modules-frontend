import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DegreePlannerComponent } from './component/degree-planner/degree-planner.component';
import { SemesterPlannerComponent } from './component/semester-planner/semester-planner.component';
import { SettingsComponent } from './component/settings/settings.component';

const routes: Routes = [
  { path: 'degree', component: DegreePlannerComponent },
  { path: 'semester', component: SemesterPlannerComponent },
  { path: '', redirectTo: '/degree', pathMatch: 'full' },];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
