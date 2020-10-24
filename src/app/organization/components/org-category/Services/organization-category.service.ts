import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class OrganizationCategoryService {

  api = 'https://r3mm6rz433.execute-api.us-east-1.amazonaws.com/Prod/org'
  constructor(private http : HttpClient) { }

  getOrganizationCategory():Observable<any> {
    return this.http.get<any>(`${this.api}/all`)
  }

  getOrganizationCategoryById(id: string): any {
    return this.http.get(`${this.api}/${id}`);
  }

  updateOrganizationById(id: string, body: any): Observable<any> {
    return this.http.put<any>(`${this.api}/${id}`, body);
  }

  deleteOrganizationById(id: string, body: any): Observable<any> {
    return this.http.put<any>(`${this.api}/${id}`,body);
  }

  addOrganizationCategory(body: any): Observable<any> {
    return this.http.post<any>(`${this.api}`, body);
  }


}
