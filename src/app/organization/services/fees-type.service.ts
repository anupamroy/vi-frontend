import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FeesService {
  api = 'https://r3mm6rz433.execute-api.us-east-1.amazonaws.com/Prod/fees';

  constructor(private http: HttpClient) {}

  getFeesType():Observable<any> {
    return this.http.get<any>(`${this.api}/all`)
  }

  getFeesTypeById(id: string):Observable<any> {
    return this.http.get<any>(`${this.api}/${id}`)
  }

  updateFeesTypeById(id: string, body: any):Observable<any> {
    return this.http.put<any>(`${this.api}/${id}`, body)
  }

  deleteFeesTypeById(id: string, body: any):Observable<any> {
    return this.http.put<any>(`${this.api}/${id}`,body)
  }

  addFeesType(body: any):Observable<any> {
    return this.http.post<any>(`${this.api}`,body)
  }
}
