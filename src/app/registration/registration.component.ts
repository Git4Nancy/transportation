import { Component, OnInit,ViewChild } from '@angular/core';
import { CompanyService } from '../company.service';
import { DriverService } from '../driver.service';
import { VehicleService } from '../vehicle.service';
import { Company } from '../util/company';
import { Driver } from '../util/driver';
import { Vehicle } from '../util/vehicle';
import { RegistrationService } from '../registration.service';
import { Registration } from '../util/registration';
import {PageChangedEvent} from 'ngx-bootstrap/pagination/public_api';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';


@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {
 
  returnedArray: Registration[] = [];
  registrationList = [];
  //__________________________________________
  displayedColumns: string[] = [ 'id','companyName','arvlDate','dptDate','guest','driverName','driverPh','vehicleName','comments','status','invoiceId'];
  //,'id','company','registration.arvl_dt','dpt_d','guestName','driver.name','driver.ph','vehicle','comments','reservationStatus','invoiceId'
  dataSource: MatTableDataSource<any>;
 
 // _____________________________________________
  companyValue: Company;
  driverVaule: Driver;
  vehicleValue: Vehicle;
  companyList = [];
  driverList = [];
  vehicleList = [];
  //registrationList = [];
  currentRegistration: Registration = null;
  comSelected:Number;
  vehSelected:Number;
  driverSelected:Number;
  
  pageSize: number = 3;
  constructor(private registrationService: RegistrationService, private companyService: CompanyService, private driverService: DriverService, private vehicleService: VehicleService) 
  { 
  }
  @ViewChild('scheduledOrdersPaginator') paginator: MatPaginator;   
  @ViewChild(MatSort) sort: MatSort;

  ngOnInit() {
   
    this.currentRegistration=new Registration();
    this.currentRegistration.vehicle = new Vehicle();
    this.currentRegistration.company = new Company();
    this.currentRegistration.driver = new Driver();
    this.loadAllCompanies();
    this.loadAllDrivers();
     this.loadAllVehicle();
    this.getAll();
     
  }
  
  pageChanged(event: PageChangedEvent): void
  {
     //console.log("Pagination");
     const startItem = (event.page - 1) * event.itemsPerPage;
     const endItem = event.page * event.itemsPerPage;
     //this.dataSource = this.registrationList.slice(startItem, endItem);
     
  }
  cancel()
  {
    this.currentRegistration=new Registration();
    this.comSelected = null;
    this.driverSelected = null;
    this.vehSelected = null;
    this.currentRegistration.vehicle = new Vehicle();
    this.currentRegistration.company = new Company();
    this.currentRegistration.driver = new Driver();
   
  }
  getAll() {
    this.registrationList=[];
    this.registrationService.getAllRegistration().subscribe(resp => {
      this.registrationList = resp;
      this.dataSource = new MatTableDataSource(this. registrationList);
    
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
     
     //this.dataSource = this.registrationList.slice(0, this.pageSize);

    });
  }
  applyFilter(filterValue: string) {
   
  this.dataSource.filter = filterValue.trim().toLowerCase();
  console.log(this.dataSource);
  }
  onVehSelected(val:any)
  {
   
   this.currentRegistration.vehicle.id=val;
  
  }
  onComSelected(val:any)
  {
    this.currentRegistration.company.id=val;
   }
  onDriverSelected(val:any)
  {
   this.currentRegistration.driver.id=val;
   }
  loadAllCompanies() {
    this.companyService.getAllCompanies().subscribe(resp => {
      for(let c of resp)
      {
        if(c.active===true)
        this.companyList.push(c);
      }
    });
  }
  loadAllVehicle() {
    this.vehicleService.getAll().subscribe(resp => {
      for(let c of resp)
      {
        if(c.active===true)
        this.vehicleList.push(c);
      }
    });
  }
  loadAllDrivers() {
    this.driverService.getAllDriver().subscribe(resp => {
      for(let c of resp)
      {
        if(c.active===true)
        this.driverList.push(c);
      }
    });
  }
  save() {
    console.log(this.currentRegistration);
    this.registrationService.saveRegistration(this.currentRegistration).subscribe(resp => {
    
    this.cancel();
   
     this.getAll();
     
    });
  }
  update() {
    this.registrationService.updateRegistration(this.currentRegistration).subscribe(resp => {
      this.cancel();
     this.getAll();
      // this.currentRegistration=new Registration();
      // this.comSelected=null;
      // this.driverSelected=null;
      // this.vehSelected=null;
    });
  }
  delete(id) {
    this.registrationService.deleteRegistration(id).subscribe(resp => {
      //  alert("Successfully Deleted");
    this.getAll(); });
    
  }
  get(id) {
    this.registrationService.getRegistration(id).subscribe(resp => {
      this.currentRegistration = resp;
      if(this.currentRegistration.company!=null)
      this.comSelected=this.currentRegistration.company.id;
      if(this.currentRegistration.vehicle!=null)
      this.vehSelected=this.currentRegistration.vehicle.id;
      if(this.currentRegistration.driver!=null)
      this.driverSelected=this.currentRegistration.driver.id;
  
      //alert(this.comSelected);
    });
  }

  calculate1()
  {
    let sd = [] = this.currentRegistration.arvl_dt.split("-");
      let date = new Date(parseInt(sd[2]), parseInt(sd[1]), parseInt(sd[0]));
      this.currentRegistration.arrivalDate = date;
      
  }
  calculate()
  {
    let sd = [] = this.currentRegistration.dpt_d.split("-");
      let date = new Date(parseInt(sd[2]), parseInt(sd[1]), parseInt(sd[0]));
      this.currentRegistration.departureDate = date;
      
  }
  view(registration)
  {this.currentRegistration=registration;}
 
}
