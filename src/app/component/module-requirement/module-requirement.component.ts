import { Component, Input, OnInit } from '@angular/core';
import { Module } from 'src/app/model/module';
import { SemesterType } from 'src/app/model/planner-config';
import { Requirement } from 'src/app/model/requirement';
import { Semester } from 'src/app/model/semester';

@Component({
  selector: 'app-module-requirement',
  templateUrl: './module-requirement.component.html',
  styleUrls: ['./module-requirement.component.sass']
})
export class ModuleRequirementComponent implements OnInit {

  @Input() requirements!: Requirement[];
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

}
