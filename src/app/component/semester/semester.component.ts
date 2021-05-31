import { Component, ElementRef, Input, OnInit } from '@angular/core';
import { Semester } from 'src/app/model/semester';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Module } from 'src/app/model/module';
import { LocalStorageService } from 'src/app/service/local-storage.service';

@Component({
  selector: 'app-semester',
  templateUrl: './semester.component.html',
  styleUrls: ['./semester.component.sass']
})
export class SemesterComponent implements OnInit {

  @Input() semester!: Semester;
  @Input() semesters!: Semester[];

  constructor(private localStorageService: LocalStorageService) { }

  ngOnInit(): void {
  }

  onModuleDrop(event: CdkDragDrop<Module[]>) {
    const moduleId = Number(event.item.element.nativeElement.getAttribute("data-module-id"));
    const actualIndex = event.previousContainer.data.findIndex(m => m.id == moduleId)
    if (event.previousContainer === event.container) {
      moveItemInArray(event.previousContainer.data, actualIndex, event.currentIndex);
    } else {
      if (event.previousContainer.element.nativeElement.classList.contains("module-library")) {
        // moved from library to planner
        event.previousContainer.data[actualIndex].initialLibraryContainer = event.previousContainer;
      }
      transferArrayItem(event.previousContainer.data,
        event.container.data,
        actualIndex,
        event.currentIndex);
    }
    this.localStorageService.set(Semester.name, this.getCurrentSemesterConfiguration());
  }

  getCurrentSemesterConfiguration() {
    let map = new Map<number, number>();
    for (const semester of this.semesters) {
      for (const module of semester.modules) {
        map.set(module.id, semester.id);
      }
    }

    return map;
  }
}
