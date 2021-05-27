import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PlannerComponent } from './component/planner/planner.component';
import { ModuleComponent } from './component/module/module.component';
import { SemesterComponent } from './component/semester/semester.component';
import { ModuleListComponent } from './component/module-list/module-list.component';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { DragDropModule } from '@angular/cdk/drag-drop';


@NgModule({
  declarations: [
    AppComponent,
    PlannerComponent,
    ModuleComponent,
    SemesterComponent,
    ModuleListComponent,
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
