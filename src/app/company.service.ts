import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import {Company} from "./util/company";
@Injectable()/**({
  providedIn: 'root'
})*/
export class CompanyService {
// private URL_COMPANY="http://apinewyorktransport.dsrtechnologies.ca/api/company";
private URL_COMPANY="http://localhost:8080/api/company";
private _options = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    
  constructor(private http: HttpClient) { }
  public getAllCompanies(): any {
    return this.http.get(this.URL_COMPANY + "/" + "all", this._options);
}
public getAllSortedCompanies(): any {
  return this.http.get(this.URL_COMPANY + "/" + "allSorted", this._options);
}
public saveCompany(company):any
{return this.http.post(this.URL_COMPANY,company,this._options);}

public updateCompany(company:Company):Observable<Company>
{return this.http.put<Company>(this.URL_COMPANY, company, this._options);}
deleteCompany(id):any{
  return this.http.delete(this.URL_COMPANY+"/"+id,this._options);
}

public getCompany(id):any
{
  return this.http.get(this.URL_COMPANY+"/"+id,this._options);}

}
