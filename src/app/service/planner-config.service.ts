import { Injectable } from '@angular/core';
import { DegreeProgram } from '../model/degree-program';
import { PlannerConfig, SemesterType, TimeModel } from '../model/planner-config';
import { LocalStorageService } from './local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class PlannerConfigService {

  config: PlannerConfig;
  constructor(private localStorageService: LocalStorageService) {
    var localConfig = localStorageService.get(PlannerConfig.name);
    if (localConfig) {
      this.config = localConfig;
    } else {
      this.config = new PlannerConfig(TimeModel.FULL_TIME, SemesterType.FALL_SEMESTER, new DegreeProgram());
    }
  }

  getConfig(): PlannerConfig {
    // return clone
    return Object.assign(new PlannerConfig(TimeModel.FULL_TIME, SemesterType.FALL_SEMESTER, new DegreeProgram()), this.config);
  }

  setConfig(config: PlannerConfig) {
    this.config = config;
    this.localStorageService.set(PlannerConfig.name, this.config);
  }
}
