import { Component, OnInit } from '@angular/core';
import {VehicleService} from '../vehicle.service';
import {Vehicle} from '../util/vehicle';
import { FormGroup,FormControl, Validators } from '../../../node_modules/@angular/forms';

@Component({
  selector: 'app-vehicle',
  templateUrl: './vehicle.component.html',
  styleUrls: ['./vehicle.component.css']
})
export class VehicleComponent implements OnInit {
  form:FormGroup;
  currentVehicle: Vehicle = null;
  vehicleList = [];
 
  constructor(private vehicleService: VehicleService) {
    this.currentVehicle = new Vehicle();
  }

  ngOnInit() {
    this.loadAllVehicle();
   // this.myForm = new FormGroup({ myForm:new FormControl("",Validators.compose([Validators.required]))    });
    this.form=new FormGroup({
      name:new FormControl("",Validators.compose([Validators.required])),
      rate:new FormControl("",Validators.compose([Validators.required,Validators.pattern("^[0-9]*$"),Validators.min(1),Validators.max(256)]))
     });
  }

  loadAllVehicle() {
    this.vehicleList=[];
    this.vehicleService.getAll().subscribe(resp => {
      for(let v of resp )
      {
        if(v.active===true)
        this.vehicleList.push(v);
      }
     // this.vehicleList = resp;
    })
  }

  edit(driver) {
    this.currentVehicle = driver;
  }
create()
{this.vehicleService.save(this.currentVehicle).subscribe(resp=>
{
  this.loadAllVehicle();
  this.currentVehicle=new Vehicle();
  alert("Saved Succesfully");
})}
update()
{this.vehicleService.update(this.currentVehicle).subscribe(resp=>{
  this.loadAllVehicle();
  this.currentVehicle=new Vehicle();
  alert("Vehicle Updtaed");
})}

cancel()
{
  this.currentVehicle=new Vehicle();
}
delete(vehicle)
{vehicle.active=false;

  this.vehicleService.update(vehicle).subscribe(resp=>{
    this.loadAllVehicle();
    this.currentVehicle=new Vehicle();
    alert("Deleted successfully");
  })
}
}
