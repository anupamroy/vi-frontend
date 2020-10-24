import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AccountsHeadService {
  api = 'https://r3mm6rz433.execute-api.us-east-1.amazonaws.com/Prod/accounts';

  constructor(private http: HttpClient) {}

  getAccountsHead():Observable<any> {
    return this.http.get<any>(`${this.api}/all`)
  }

  getAccountsHeadById(id: string):Observable<any> {
    return this.http.get<any>(`${this.api}/${id}`)
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
