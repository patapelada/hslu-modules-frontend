import { Component, Input, OnInit } from '@angular/core';
import { Module } from 'src/app/model/module';

@Component({
  selector: 'app-module-language',
  templateUrl: './module-language.component.html',
  styleUrls: ['./module-language.component.sass']
})
export class ModuleLanguageComponent implements OnInit {

  @Input() module!: Module;

  constructor() { }

  ngOnInit(): void {
  }

}
