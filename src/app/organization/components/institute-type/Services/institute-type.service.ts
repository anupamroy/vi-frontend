import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs'
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class InstituteTypeService {
  api = environment.api;


  constructor(private http : HttpClient) { }

  

  getInstituteType():Observable<any> {
    return this.http.get<any>(`${this.api}/all`)
  }

  updateInstituteTypeById(id : string, body : any):Observable<any>{

    return this.http.put<any>(`${this.api}/${id}`,body) 
  }

  postInstituteType(body: any):Observable<any>{
    return this.http.post<any>(`${this.api}`, body)
  }

  deleteInstituteType(id : string, body: any):Observable<any>{
    return this.http.put<any>(`${this.api}/${id}`, body) 
  }

}
