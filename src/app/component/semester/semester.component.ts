import { Component, Input, OnInit } from '@angular/core';
import { Semester } from 'src/app/model/semester';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Module } from 'src/app/model/module';

@Component({
  selector: 'app-semester',
  templateUrl: './semester.component.html',
  styleUrls: ['./semester.component.sass']
})
export class SemesterComponent implements OnInit {

  @Input() semester!: Semester;
  @Input() semesters!: Semester[];
  @Input() dropZones!: string;


  constructor() { }

  ngOnInit(): void {
  }

  onModuleDrop(event: CdkDragDrop<Module[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      if (event.previousContainer.element.nativeElement.classList.contains("module-library")) {
        // moved from library to planner
        event.previousContainer.data[event.previousIndex].initialLibraryContainer = event.previousContainer;
      }
      transferArrayItem(event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex);
    }
  }
}
