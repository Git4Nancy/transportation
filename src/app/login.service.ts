import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
@Injectable({
  providedIn: 'root'
})
export class LoginService {
// private URL_LOGIN = "http://apinewyorktransport.dsrtechnologies.ca/authenticate";
private URL_LOGIN = "http://localhost:8080/authenticate";
private _options = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
  constructor(private http: HttpClient) { 

  }
public verifyLogin(login): any {
        return this.http.post(this.URL_LOGIN, login,this._options);
    }
}
