import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { DriverSalary } from './util/driver-salary';
@Injectable({
  providedIn: 'root'
})
export class DriverSalayService {
  
  // private URL_DRIVER = "http://apinewyorktransport.dsrtechnologies.ca/api/driverSalary";
  private URL_DRIVER = "http://localhost:8080/api/driverSalary";
  private _options = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
  constructor(private http: HttpClient) { }
  
 createDriverSalary(driver): any {
    return this.http.post(this.URL_DRIVER, driver, this._options);// driver argument will accurately will save driver
}
getAllDriverSalary(): any {
  return this.http.get(this.URL_DRIVER + "/all",this._options);
}
updateDriverSalary(driverSalary:DriverSalary):Observable<DriverSalary>{
  return this.http.put<DriverSalary>(this.URL_DRIVER,driverSalary , this._options);
}
  getDriverSalary(id): any {
      return this.http.get(this.URL_DRIVER  + "/" + id, this._options);
  }
  
  deleteDriverSalary(id): any {
      return this.http.delete(this.URL_DRIVER +  "/" + id, this._options);
  }
}
