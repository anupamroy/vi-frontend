import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class OrganizationCategoryService {

  api = environment.api;
  constructor(private http : HttpClient) { }

  getOrganizationCategory():Observable<any> {
    return this.http.get<any>(`${this.api}/all`)
  }

  getOrganizationCategoryById(id: string): any {
    return this.http.get(`${this.api}/${id}?masterType=ORGANIZATION_CATEGORY`);
  }

  updateOrganizationById(id: string, body: any): Observable<any> {
    return this.http.put<any>(`${this.api}/${id}`, body);
  }

  deleteOrganizationById(id: string,body: any): Observable<any> {
    return this.http.put<any>(`${this.api}/${id}`, body);
  }

  addOrganizationCategory(body: any): Observable<any> {
    return this.http.post<any>(`${this.api}`, body);
  }


}
