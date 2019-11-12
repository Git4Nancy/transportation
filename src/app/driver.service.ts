import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { Driver } from "./util/driver";

@Injectable()
export class DriverService {
    
    // private URL_DRIVER = "http://apinewyorktransport.dsrtechnologies.ca/api/driver";
    private URL_DRIVER = "http://localhost:8080/api/driver";
    private _options = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    constructor(private http: HttpClient) {

    }

    public createDriver(driver): any {
        return this.http.post(this.URL_DRIVER, driver, this._options);// driver argument will accurately will save driver
    }

   /** public updateDriver(driver:Driver): Observable<Driver> {
        return this.http.put<Driver>(this.URL_DRIVER, driver, this._options);
    }*/
    //both update methods are workful
    public updateDriver(driver): any {
        return this.http.put(this.URL_DRIVER, driver,this._options);
    }

    public deleteDriver(id): any {
        return this.http.delete(this.URL_DRIVER + "/" + id, this._options);
    }

    public getDriver(id): any {
        return this.http.get(this.URL_DRIVER + "/" + id, this._options);
    }
    
    public getAllDriver(): any {
        return this.http.get(this.URL_DRIVER + "/all", this._options);
    }

   

}