import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class InstituteTypeService {
  api = "https://r3mm6rz433.execute-api.us-east-1.amazonaws.com/Prod/org"


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
