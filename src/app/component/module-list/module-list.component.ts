import { Component, Input, OnInit } from '@angular/core';
import { Module, MODULE_TYPE } from '../../model/module';
import { ModuleService } from '../../service/module.service';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { DegreeProgramService } from 'src/app/service/degree-program.service';
import { DegreeProgram } from 'src/app/model/degree-program';
import { MajorProgram } from 'src/app/model/major-program';
import { stringify } from '@angular/compiler/src/util';
import { Requirement } from 'src/app/model/requirement';
import { PlannerConfigService } from 'src/app/service/planner-config.service';


@Component({
  selector: 'app-module-list',
  templateUrl: './module-list.component.html',
  styleUrls: ['./module-list.component.sass']
})
export class ModuleListComponent implements OnInit {

  @Input() dropZones!: string;

  modules: Module[] = [];
  majors: MajorProgram[] = [];
  groupedModules!: Map<MODULE_TYPE, Module[]>;
  moduleTypes: string[] = Object.keys(MODULE_TYPE);

  constructor(private moduleService: ModuleService, private degreeProgramService: DegreeProgramService, private plannerConfigService: PlannerConfigService) {
  }

  ngOnInit(): void {
    this.initModules();
    this.initMajorModules();
  }

  initMajorModules() {
    const degreeProgram = this.plannerConfigService.getConfig().degreeProgram;
    this.degreeProgramService.get(degreeProgram.id).subscribe(
      (data: DegreeProgram) => {
        data.majors.forEach(major => {
          this.majors.push(new MajorProgram().deserialize(major));
        });
        this.majors.sort((major: MajorProgram, other: MajorProgram) => {
          return major.name.localeCompare(other.name);
        });
        for (const major of this.majors) {
          major.requirements.sort((requirement: Requirement, other: Requirement) => {
            return Number(other.inclusive) - Number(requirement.inclusive);
          });
          for (const req of major.requirements) {
            req.modules.sort((module: Module, other: Module) => {
              return module.code.localeCompare(other.code);
            })
          }
        }
      },
      error => {
        console.log(error);
      });


  }

  initModules() {
    this.moduleService.getAll().subscribe(
      (data: Module[]) => {
        data.forEach(module => {
          this.modules.push(new Module().deserialize(module));
        });
        this.groupedModules = this.groupBy(this.modules, (module: any) => module.type);
      },
      error => {
        console.log(error);
      });

  }

  onModuleDrop(event: CdkDragDrop<Module[]>) {
    console.log("module drop");
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex);
    }
  }

  groupBy(list: any, keyGetter: any) {
    const map = new Map();
    list.forEach((item: any) => {
      const key = keyGetter(item);
      const collection = map.get(key);
      if (!collection) {
        map.set(key, [item]);
      } else {
        collection.push(item);
      }
    });

    return map;
  }
}


