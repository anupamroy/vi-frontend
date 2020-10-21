import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FeesService {
  api = 'https://r3mm6rz433.execute-api.us-east-1.amazonaws.com/Prod/fees';

  constructor(private http: HttpClient) {}

  getFeesHeadById(id: string): Observable<any> {
    return this.http.get(`${this.api}/${id}`);
  }

  updateFeesHeadById(id: string, body: any): Observable<any> {
    return this.http.put<any>(`${this.api}/${id}`, body);
  }

  deleteFeesHeadById(id: string): Observable<any> {
    return this.http.delete<any>(`${this.api}/${id}`);
  }

  addFeesHead(body: any): Observable<any> {
    return this.http.post<any>(`${this.api}`, body);
  }

  getFeesHeads(): Observable<any> {
    return this.http.get<any>(`${this.api}/all`);
  }

  getInstituteTypes(): Observable<any> {
    return this.http.get<any>(
      'https://r3mm6rz433.execute-api.us-east-1.amazonaws.com/Prod/org/all'
    );
  }
}
