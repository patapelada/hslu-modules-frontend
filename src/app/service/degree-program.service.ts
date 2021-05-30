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
  apiUrl: string = environment.apiRoot.concat("/api/degreeProgram")

  constructor(private http: HttpClient) { }

  get(id: string): Observable<DegreeProgram> {
    return this.http.get<DegreeProgram>(this.apiUrl.concat("/").concat(id));
  }

  getAll(): Observable<DegreeProgram[]> {
    return this.http.get<DegreeProgram[]>(this.apiUrl);
  }
}