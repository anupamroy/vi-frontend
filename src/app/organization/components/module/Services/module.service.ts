import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs'
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class ModuleService {

  api = environment.api;


  constructor(private http : HttpClient) { }

  

  getModules():Observable<any> {
    return this.http.get<any>(`${this.api}/all`)
  }

  updateModule(id : string, body : any):Observable<any>{

    return this.http.put<any>(`${this.api}/${id}`,body) 
  }

  postModule(body: any):Observable<any>{
    return this.http.post<any>(`${this.api}`, body)
  }

  deleteModule(id : string, body: any):Observable<any>{
    return this.http.put<any>(`${this.api}/${id}` , body) 
  }

}

