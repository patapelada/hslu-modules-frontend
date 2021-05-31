import { Component, Input, OnInit } from '@angular/core';
import { Module, MODULE_TYPE } from '../../model/module';
import { ModuleService } from '../../service/module.service';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { DegreeProgramService } from 'src/app/service/degree-program.service';
import { DegreeProgram } from 'src/app/model/degree-program';
import { MajorProgram } from 'src/app/model/major-program';
import { Requirement } from 'src/app/model/requirement';
import { PlannerConfigService } from 'src/app/service/planner-config.service';
import { Semester } from 'src/app/model/semester';
import { LocalStorageService } from 'src/app/service/local-storage.service';


@Component({
  selector: 'app-module-list',
  templateUrl: './module-list.component.html',
  styleUrls: ['./module-list.component.sass']
})
export class ModuleListComponent implements OnInit {

  @Input() semesters?: Semester[];

  modules: Module[] = [];
  majors: MajorProgram[] = [];
  groupedModules!: Map<MODULE_TYPE, Module[]>;
  moduleTypes: string[] = Object.keys(MODULE_TYPE);
  semesterConfig: Map<number, number>;
  filter!: string;

  filterModule = (module: Module) => {
    if (!this.filter)
      return true;
    const searchTerm = this.filter.toLowerCase();
    return module.name.toLowerCase().startsWith(searchTerm) || module.code.toLowerCase().startsWith(searchTerm);
  }

  filterModuleType = (entry: [MODULE_TYPE, Module[]]) => {
    const filteredModules = (Object.values(entry)[1] as Module[]).filter(this.filterModule);
    return filteredModules.length > 0;
  }

  filterRequirements = (req: Requirement) => {
    const filteredRequirements = req.modules.filter(this.filterModule)
    return filteredRequirements.length > 0;
  }

  filterMajors = (major: MajorProgram) => {
    const filteredMajors = major.requirements.filter(this.filterRequirements);
    return filteredMajors.length > 0;
  }


  constructor(private moduleService: ModuleService,
    private degreeProgramService: DegreeProgramService,
    private plannerConfigService: PlannerConfigService,
    private localStorageService: LocalStorageService) {
    this.semesterConfig = localStorageService.get(localStorageService.SEMESTER_CONFIG_KEY);
  }

  ngOnInit(): void {
    this.initMajorModules();
    this.initModules();
  }

  initMajorModules() {
    const degreeProgram = this.plannerConfigService.getConfig().degreeProgram;

    this.degreeProgramService.get(degreeProgram.id ? degreeProgram.id : "IBA").subscribe(
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
            this.fillAlreadyAssignedSemesters(req.modules);
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
        this.fillAlreadyAssignedSemesters(this.modules);
        this.groupedModules = this.groupBy(this.modules, (module: any) => module.type);
      },
      error => {
        console.log(error);
      });
  }

  fillAlreadyAssignedSemesters(modules: Module[]) {
    if (this.semesters && this.semesterConfig) {
      for (const [moduleId, semesterIndex] of this.semesterConfig) {
        let foundModule = modules.find(m => m.id === moduleId);
        if (foundModule) {
          this.semesters[semesterIndex - 1].modules.push(foundModule);
          this.semesterConfig.delete(moduleId);
          modules.forEach((module, index) => {
            if (module === foundModule) modules.splice(index, 1);
          });
        }
      }
    }
  }

  findModuleById(module: Module, id: number) {
    return module.id === id;
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



