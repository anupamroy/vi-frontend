import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AssociatedPostService {

  api = environment.api;
  constructor(private http : HttpClient) { }

  getAssociatedPost():Observable<any> {
    return this.http.get<any>(`${this.api}/all`)
  }

  getAssociatedPostById(id: string): any {
    return this.http.get(`${this.api}/${id}`);
  }

  updateAssociatedPostById(id: string, body: any): Observable<any> {
    return this.http.put<any>(`${this.api}/${id}`, body);
  }

  deleteAssociatedPostById(id: string, body: any): Observable<any> {
    return this.http.put<any>(`${this.api}/${id}`, body);
  }

  addAssociatedPost(body: any): Observable<any> {
    return this.http.post<any>(`${this.api}`, body);
  }
}
