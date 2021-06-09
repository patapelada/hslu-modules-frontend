import { Component, Input, OnInit } from '@angular/core';
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
  selector: 'app-execution-list',
  templateUrl: './execution-list.component.html',
  styleUrls: ['./execution-list.component.sass']
})
export class ExecutionListComponent implements OnInit {

  @Input() week!: Week;

  modules: Module[] = [];
  majors: MajorProgram[] = [];
  groupedModules!: Map<MODULE_TYPE, Module[]>;
  groupedMajorModules: Map<MajorProgram, Module[]> = new Map;

  moduleTypes: string[] = Object.keys(MODULE_TYPE);
  filter!: string;

  constructor(private moduleService: ModuleService,
    private degreeProgramService: DegreeProgramService,
    private plannerConfigService: PlannerConfigService,
    private localStorageService: LocalStorageService) {
  }

  ngOnInit(): void {
    this.initModules();
    this.initMajorModules();
  }

  initModules() {
    this.moduleService.getAll().subscribe(
      (data: Module[]) => {
        data.forEach(module => {
          if (module.executions.length > 0) {
            let executableModule = new Module().deserialize(module);
            this.sortExecutionBlocks(executableModule);
            this.modules.push(executableModule);
          }
        });
        this.groupedModules = this.groupBy(this.modules, (module: any) => module.type);
      },
      error => {
        console.log(error);
      });
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
          let majorModules: Module[] = [];
          for (const req of major.requirements) {
            for (const module of req.modules) {
              if (module.executions.length > 0) {
                this.sortExecutionBlocks(module);
                majorModules.push(module);
              }
            }
          }
          majorModules.sort((module: Module, other: Module) => {
            return module.code.localeCompare(other.code);
          })
          this.groupedMajorModules.set(major, majorModules);
        }
      },
      error => {
        console.log(error);
      });
  }

  sortExecutionBlocks(module: Module) {
    module.executions.sort((execution: Execution, other: Execution) => {
      return execution.id - other.id;
    })
    module.executions.forEach((execution: Execution) => {
      execution.blocks.sort((a: ExecutionBlock, b: ExecutionBlock) => {
        return a.day - b.day;
      });
    });
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

  filterMajor = (entry: [MajorProgram, Module[]]) => {
    const filteredMajors = (Object.values(entry)[1] as Module[]).filter(this.filterModule);
    return filteredMajors.length > 0;
  }
}


