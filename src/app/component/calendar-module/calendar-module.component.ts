import { Component, Input, OnInit } from '@angular/core';
import { Execution, ExecutionBlock } from 'src/app/model/execution';
import { Module } from 'src/app/model/module';
import { Week } from 'src/app/model/week';

@Component({
  selector: 'app-calendar-module',
  templateUrl: './calendar-module.component.html',
  styleUrls: ['./calendar-module.component.sass']
})
export class CalendarModuleComponent implements OnInit {

  @Input() module!: Module;
  @Input() week!: Week;
  @Input() blockNo!: number;
  @Input() dayNo!: number;

  constructor() { }

  ngOnInit(): void {
  }

  removeFromCalendar(module: Module) {
    module.selectedExecution?.blocks.forEach((executionBlock: ExecutionBlock) => {
      let block = this.week.blocks.get(executionBlock.number)?.get(executionBlock.day);
      block?.modules.forEach((value, index) => {
        if (value == module) block?.modules.splice(index, 1);
      });
    });
    module.selectedExecution = null;
  }

}
