import { Component, OnInit } from '@angular/core';
import { DegreeProgram } from 'src/app/model/degree-program';
import { Execution, ExecutionBlock } from 'src/app/model/execution';
import { MajorProgram } from 'src/app/model/major-program';
import { Module, MODULE_TYPE } from 'src/app/model/module';
import { Week } from 'src/app/model/week';
import { DegreeProgramService } from 'src/app/service/degree-program.service';
import { LocalStorageService } from 'src/app/service/local-storage.service';
import { ModuleService } from 'src/app/service/module.service';
import { PlannerConfigService } from 'src/app/service/planner-config.service';

@Component({
  selector: 'app-semester-planner',
  templateUrl: './semester-planner.component.html',
  styleUrls: ['./semester-planner.component.sass']
})
export class SemesterPlannerComponent implements OnInit {

  week!: Week;

  constructor() {
    this.week = new Week();
  }

  ngOnInit(): void {
  }
}
