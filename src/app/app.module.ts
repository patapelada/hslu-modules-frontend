import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ModuleComponent } from './component/module/module.component';
import { SemesterComponent } from './component/semester/semester.component';
import { ModuleListComponent } from './component/module-list/module-list.component';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { SettingsComponent } from './component/settings/settings.component';
import { CallbackPipe } from './util/callback.pipe';
import { DegreePlannerComponent } from './component/degree-planner/degree-planner.component';
import { SemesterPlannerComponent } from './component/semester-planner/semester-planner.component';
import { ExecutionComponent } from './component/execution/execution.component';
import { ModuleRequirementComponent } from './component/module-requirement/module-requirement.component';
import { ModuleLanguageComponent } from './component/module-language/module-language.component';
import { CalendarModuleComponent } from './component/calendar-module/calendar-module.component';
import { ExecutionListComponent } from './component/execution-list/execution-list.component';


@NgModule({
  declarations: [
    AppComponent,
    ModuleComponent,
    SemesterComponent,
    ModuleListComponent,
    SettingsComponent,
    CallbackPipe,
    DegreePlannerComponent,
    SemesterPlannerComponent,
    ExecutionComponent,
    ModuleRequirementComponent,
    ModuleLanguageComponent,
    CalendarModuleComponent,
    ExecutionListComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule, FormsModule, HttpClientModule, DragDropModule,
  ],
  providers: [
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
