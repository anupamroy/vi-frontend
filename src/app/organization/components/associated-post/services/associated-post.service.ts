import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AssociatedPostService {

  api = 'https://r3mm6rz433.execute-api.us-east-1.amazonaws.com/Prod/org'
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
