import { Component, OnInit } from '@angular/core';
import { MODULE_TYPE } from './model/module';
import { PlannerConfig, SemesterType, TimeModel } from './model/planner-config';
import { Semester } from './model/semester';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent implements OnInit {

  config: PlannerConfig = new PlannerConfig(TimeModel.FULL_TIME, SemesterType.FALL_SEMESTER);
  timeModels = Object.values(TimeModel);
  semesterTypes = Object.values(SemesterType);
  semesters: Semester[] = [];

  constructor() { }

  ngOnInit(): void {
    this.initSemesters()
  }

  initSemesters() {
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