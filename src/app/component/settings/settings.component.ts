import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { Modal } from 'bootstrap';
import { DegreeProgram } from 'src/app/model/degree-program';
import { PlannerConfig, SemesterType, TimeModel } from 'src/app/model/planner-config';
import { Semester } from 'src/app/model/semester';
import { DegreeProgramService } from 'src/app/service/degree-program.service';
import { LocalStorageService } from 'src/app/service/local-storage.service';
import { PlannerConfigService } from 'src/app/service/planner-config.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.sass']
})
export class SettingsComponent implements OnInit {

  @Output() configUpdatedEvent = new EventEmitter<PlannerConfig>();

  config!: PlannerConfig;
  degreePrograms: DegreeProgram[] = [];
  timeModels = Object.values(TimeModel);
  startSemesters = Object.values(SemesterType);
  modal?: Modal;

  constructor(private degreeProgramService: DegreeProgramService, private plannerConfigService: PlannerConfigService, private localStorageService: LocalStorageService) {
    this.loadConfig();
  }

  loadConfig() {
    this.config = this.plannerConfigService.getConfig();
  }

  ngOnInit(): void {
    this.modal = new Modal(document.getElementById("settingsModal")!);
    this.degreeProgramService.getAll().subscribe(
      (data: any) => {
        data.forEach((program: any) => {
          this.degreePrograms.push(new DegreeProgram().deserialize(program));
          if (!this.config.degreeProgram.id) {
            this.config.degreeProgram = this.degreePrograms[0];
            this.plannerConfigService.setConfig(this.config);
            this.loadConfig();
          }
        });

      },
      error => {
        console.log(error);
      });
  }

  showModal() {
    this.loadConfig();
    this.modal?.show();
  }

  closeModal() {
    this.modal?.hide();
  }

  onSubmit() {
    this.plannerConfigService.setConfig(this.config);
    this.configUpdatedEvent.emit(this.plannerConfigService.getConfig());
    this.localStorageService.remove(Semester.name);
    this.closeModal();
  }

}
