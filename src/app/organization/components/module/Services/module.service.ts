import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class ModuleService {
  api = " https://rmxhxsszxg.execute-api.us-east-1.amazonaws.com/Prod/org"


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

  deleteModule(id : string):Observable<any>{
    return this.http.delete<any>(`${this.api}/${id}`) 
  }

}

