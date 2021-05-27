import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { PlannerConfig, SemesterType, TimeModel } from 'src/app/model/planner-config';
import { Semester } from 'src/app/model/semester';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Module, MODULE_TYPE } from 'src/app/model/module';
import { __spreadArrays } from 'tslib';


@Component({
  selector: 'app-planner',
  templateUrl: './planner.component.html',
  styleUrls: ['./planner.component.sass']
})
export class PlannerComponent implements OnInit {

  @Input() semesters!: Semester[];
  @Input() dropZones!: string;

  ngOnInit(): void {
  }

}
