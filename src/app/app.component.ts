import { Component, OnInit, QueryList, ViewChildren } from '@angular/core';
import { DegreeProgram } from './model/degree-program';
import { MODULE_TYPE } from './model/module';
import { PlannerConfig, SemesterType, TimeModel } from './model/planner-config';
import { Semester } from './model/semester';
import { PlannerConfigService } from './service/planner-config.service';
import { CdkDropList, copyArrayItem } from '@angular/cdk/drag-drop';
import { LocalStorageService } from './service/local-storage.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent implements OnInit {

  config!: PlannerConfig;
  timeModels = Object.values(TimeModel);
  semesterTypes = Object.values(SemesterType);
  semesters!: Semester[];

  constructor(private plannerConfigService: PlannerConfigService, private localStorageService: LocalStorageService) {

  }

  ngOnInit(): void {
    this.initSemesters()
  }

  initSemesters() {
    this.config = this.plannerConfigService.getConfig();
    if (this.semesters && this.semesters.length > 0) {
      // move modules back to their initial container
      for (const semester of this.semesters) {
        let i = 0;
        for (const module of semester.modules) {
          if (module.initialLibraryContainer) {
            copyArrayItem(semester.modules, module.initialLibraryContainer.data, i, module.initialLibraryContainer.data.length);
          }
          i++;
        }
      }
    }

    this.semesters = [];
    let semesterCount = 6;
    if (this.config.timeModel == TimeModel.PART_TIME) {
      semesterCount += 2;
    }
    let lastSemester = this.config.startSemester;
    for (let index = 1; index <= semesterCount; index++) {
      this.semesters[index - 1] = new Semester(index, lastSemester, []);
      lastSemester = lastSemester == SemesterType.FALL_SEMESTER ? SemesterType.SPRING_SEMESTER : SemesterType.FALL_SEMESTER;
    }
  }

}