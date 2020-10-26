import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PackagesService {

  api = 'https://rmxhxsszxg.execute-api.us-east-1.amazonaws.com/Prod/org';
  constructor(private http: HttpClient) { }

  packageTypeArray: string[] = ['Type 1','Type 2','Type 3']
  paymentPlanArray: string[] = ['Plan 1','Plan 2','Plan 3']

  getPackageType(){
    return this.packageTypeArray
  }
  getPaymentPlan(){
    return this.paymentPlanArray
  }

  getPackage():Observable<any> {
    return this.http.get<any>(`${this.api}/all`)
  }

  getPackageById(id: string):Observable<any> {
    return this.http.get<any>(`${this.api}/${id}`)
  }

  updatePackageById(id: string, body: any):Observable<any> {
    return this.http.put<any>(`${this.api}/${id}`, body)
  }

  deletePackagebyId(id: string):Observable<any> {
    return this.http.delete<any>(`${this.api}/${id}`)
  }

  addPackage(body: any):Observable<any> {
    return this.http.post<any>(`${this.api}`,body)
  }
}
