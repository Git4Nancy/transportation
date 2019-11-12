import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {Invoice} from './util/invoice';

@Injectable()
export class DataService {
    
    // private URL_APP = "http://apinewyorktransport.dsrtechnologies.ca/api/invoice";
    private URL_APP = "http://localhost:8080/api/invoice";
    private _options = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };

    constructor(private http: HttpClient) {
    }

   
    getAllInvoices(): any {
        return this.http.get(this.URL_APP + "/all",this._options);
    }
    
    saveInvoice(invoice): any {
        return this.http.post(this.URL_APP,invoice , this._options);
    }
updateInvoice(invoice:Invoice):Observable<Invoice>{
    return this.http.put<Invoice>(this.URL_APP,invoice , this._options);
  }
    getInvoice(id): any {
        return this.http.get(this.URL_APP  + "/" + id, this._options);
    }
    
    deleteInvoice(id): any {
        return this.http.delete(this.URL_APP +  "/" + id, this._options);
    }

}