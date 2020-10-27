import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment'

@Injectable({
  providedIn: 'root'
})
export class AccountsHeadService {
 
  api = environment.api;
  constructor(private http: HttpClient) {}

  getAccountsHead():Observable<any> {
    return this.http.get<any>(`${this.api}/all`)
  }

  getAccountsHeadById(id: string):Observable<any> {
    return this.http.get<any>(`${this.api}/${id}?masterType=ACCOUNTS_HEAD`)
  }

  updateAccountsHeadById(id: string, body: any):Observable<any> {
    return this.http.put<any>(`${this.api}/${id}`, body)
  }

  deleteAccountsHeadById(id: string, body: any):Observable<any> {
    return this.http.put<any>(`${this.api}/${id}`,body)
  }

  addAccountsHead(body: any):Observable<any> {
    return this.http.post<any>(`${this.api}`,body)
  }
}
