import { Injectable } from '@angular/core';
import {HttpHeaders,HttpClient} from '@angular/common/http';
import {Registration} from './util/registration';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RegistrationService {
  
// private URL_REGISTRATION="http://apinewyorktransport.dsrtechnologies.ca/api/registration";
private URL_REGISTRATION="http://localhost:8080/api/registration";
private _option={headers:new HttpHeaders({'Content-Type':'application/json'})};
  constructor(private http:HttpClient) {}
  saveRegistration(registration):any
  {
    return this.http.post(this.URL_REGISTRATION,registration,this._option);
  }
  updateRegistration(registration):any
  {
    return this.http.put(this.URL_REGISTRATION,registration,this._option);
  }
  deleteRegistration(id):any
  {return this.http.delete(this.URL_REGISTRATION+"/"+id,this._option);}

  getRegistration(id):any
  {return this.http.get(this.URL_REGISTRATION+"/"+id,this._option);}

  getAllRegistration():any
  {
    
return this.http.get(this.URL_REGISTRATION+"/all",this._option);
  }
}
