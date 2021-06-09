import { Component, Input, OnInit } from '@angular/core';
import { Execution, ExecutionBlock } from 'src/app/model/execution';
import { Module } from 'src/app/model/module';
import { Week } from 'src/app/model/week';

@Component({
  selector: 'app-execution',
  templateUrl: './execution.component.html',
  styleUrls: ['./execution.component.sass']
})
export class ExecutionComponent implements OnInit {

  @Input() module!: Module;
  @Input() week!: Week;

  constructor() { }

  ngOnInit(): void {
  }

  addToSemester(execution: Execution) {
    console.log(execution)
    if (this.module.selectedExecution) {
      this.module.selectedExecution.blocks.forEach((executionBlock: ExecutionBlock) => {
        let block = this.week.blocks.get(executionBlock.number)?.get(executionBlock.day);
        block?.modules.forEach((value, index) => {
          if (value == this.module) block?.modules.splice(index, 1);
        });
      });
    }

    for (const block of execution.blocks) {
      this.week.blocks.get(block.number)?.get(block.day)?.modules?.push(this.module);
    }
    this.module.selectedExecution = execution;
  }

}
