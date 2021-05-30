import { Component, OnInit } from '@angular/core';
import { DegreeProgram } from './model/degree-program';
import { MODULE_TYPE } from './model/module';
import { PlannerConfig, SemesterType, TimeModel } from './model/planner-config';
import { Semester } from './model/semester';
import { PlannerConfigService } from './service/planner-config.service';
import { copyArrayItem } from '@angular/cdk/drag-drop';

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

  constructor(private plannerConfigService: PlannerConfigService) {

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
      this.semesters[index - 1] = new Semester("semester" + index, lastSemester, []);
      lastSemester = lastSemester == SemesterType.FALL_SEMESTER ? SemesterType.SPRING_SEMESTER : SemesterType.FALL_SEMESTER;
    }
  }

  get dropZones(): string {
    let moduleIds: string[] = Object.keys(MODULE_TYPE);
    let ids: string[] = this.semesters.map(semester => semester.id)
    moduleIds.forEach(id => {
      ids.push(id);
    });

    return "[" + ids.join(',') + "]";
  }

}