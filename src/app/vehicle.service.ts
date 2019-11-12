import { Injectable } from '@angular/core';
import {HttpClient,HttpHeaders} from '@angular/common/http';
import {Vehicle} from './util/vehicle';
//import { Observable } from '../../node_modules/rxjs';
import {Observable} from "rxjs";
@Injectable({
  providedIn: 'root'
})
export class VehicleService {
// private URL_VEHICLE="http://apinewyorktransport.dsrtechnologies.ca/api/vehicle";
private URL_VEHICLE="http://localhost:8080/api/vehicle";
private _options={headers:new HttpHeaders({'Content-Type':'application/json'}) };
  constructor(private http:HttpClient){ }
  public save(vehicle):any{
    return this.http.post(this.URL_VEHICLE,vehicle,this._options);
  }
  public update(vehicle:Vehicle):Observable<Vehicle>{
    return this.http.put<Vehicle>(this.URL_VEHICLE,vehicle,this._options);
  }
  public delete(id):any{
    return this.http.delete(this.URL_VEHICLE+"/"+id,this._options);
  }
  public get(id):any{
    return this.http.get(this.URL_VEHICLE+"/"+id,this._options);
  }
  public getAll():any{
    return this.http.get(this.URL_VEHICLE+"/all");
  }
}
