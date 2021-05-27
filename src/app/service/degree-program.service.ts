import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Module } from '../model/module';
import { Observable } from 'rxjs';
import { DegreeProgram } from '../model/degree-program';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class DegreeProgramService {
  apiUrl: string = environment.apiRoot.concat("/api/degreeProgram/IBA")

  constructor(private http: HttpClient) { }

  getAll(): Observable<DegreeProgram> {
    return this.http.get<DegreeProgram>(this.apiUrl);
  }
}