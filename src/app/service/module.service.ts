import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Module } from '../model/module';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class ModuleService {
  apiUrl: string = environment.apiRoot.concat("/module")

  constructor(private http: HttpClient) { }

  getAll(): Observable<Module[]> {
    return this.http.get<Module[]>(this.apiUrl);
  }
}