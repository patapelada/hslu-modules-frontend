import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Module } from 'src/app/model/module';
import { SemesterType } from 'src/app/model/planner-config';
import { Requirement } from 'src/app/model/requirement';
import { Semester } from 'src/app/model/semester';

@Component({
  selector: 'app-module',
  templateUrl: './module.component.html',
  styleUrls: ['./module.component.sass']
})
export class ModuleComponent implements OnInit {

  @Input() module!: Module;
  @Input() semesters?: Semester[];
  @Input() assignedSemester?: Semester;

  constructor() { }

  ngOnInit(): void {
  }

  getRequirementStatus(requirement: Requirement): boolean {
    if (this.assignedSemester && this.semesters) {
      let assignedModules: Module[] = [];
      for (const semester of this.semesters) {
        assignedModules = assignedModules.concat(semester.modules);
        if (semester == this.assignedSemester)
          break;
      }

      let containsExclusive = false;
      let containsAll = true;
      for (const reqModule of requirement.modules) {
        if (!assignedModules.some(m => m.id === reqModule.id)) {
          containsAll = false;
        } else {
          containsExclusive = true;
        }
      }
      return requirement.inclusive ? containsAll : containsExclusive;
    }
    return true;
  }
  getMatchingSemesterStatus(): boolean {
    if (this.assignedSemester && this.semesters) {
      switch (this.assignedSemester.type) {
        case SemesterType.SPRING_SEMESTER:
          return this.module.springSemesterModel;
        case SemesterType.FALL_SEMESTER:
          return this.module.fallSemesterModel;
      }
    }
    return true;
  }

}
