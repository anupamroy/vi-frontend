import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AddOrganizationService {
  constructor(private http: HttpClient) {}

  api = environment.api;

  addOrganization(body: any): Observable<any> {
    return this.http.post<any>(`${this.api}`, body);
  }

  getAllData(): Observable<any> {
    return this.http.get<any>(`${this.api}/all`);
  }
}
