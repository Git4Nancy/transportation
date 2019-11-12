import { Component, OnInit } from '@angular/core';
import { DriverSalary } from '../util/driver-salary';
import {DriverSalaryDetail} from '../util/driver-salary-detail';
import {Company} from '../util/company';
import {Driver} from '../util/driver';
import {Vehicle} from '../util/vehicle';
import { DriverService } from '../driver.service';
import { CompanyService } from '../company.service';
import { RegistrationService } from '../registration.service';
import {VehicleService} from '../vehicle.service';
import {DriverSalayService} from '../driver-salay.service';
@Component({
  selector: 'app-driver-salary',
  templateUrl: './driver-salary.component.html',
  styleUrls: ['./driver-salary.component.css']
})
export class DriverSalaryComponent implements OnInit {
  driverSalaries: DriverSalary[] = [];
  companies: Company[] = [];
  drivers: Driver[] = [];
  vehicles: Vehicle[] = [];
  driverSalaryDetailList: DriverSalaryDetail[] = [];
  currentDriverSalary: DriverSalary = null;
  selectedCompany:string=null;

  constructor(private driverSalaryService: DriverSalayService, private driverService: DriverService,private companyService:CompanyService,private vehicleService:VehicleService,private registrationService:RegistrationService) { }

  ngOnInit() {
    this.currentDriverSalary=new DriverSalary();
    this.driverSalaryDetailList=[];
    this.currentDriverSalary.driverSalaryDetail=this.driverSalaryDetailList;
    this.addLine();
    this.loadDriverSalaries();
    this.loadCompanies();
    this.loadDrivers();
    this.loadVehicles();
  }
  addLine() {
    //this.invoice.invoiceItem.push(new InvoiceItem());
    this.currentDriverSalary.driverSalaryDetail.push(new DriverSalaryDetail());
  }
  loadDriverSalaries() {
    this.driverSalaryService.getAllDriverSalary().subscribe(resp => {
      console.log(resp);
      this.driverSalaries = resp;
    });
  }
  loadCompanies() {
    this.companyService.getAllCompanies().subscribe(resp => {
      console.log(resp);
      this.companies = resp;
    });
  }
  loadDrivers() {
    this.driverService.getAllDriver().subscribe(resp => {
      console.log(resp);
      this.drivers = resp;
    });
  }
  loadVehicles() {
    this.vehicleService.getAll().subscribe(resp => {
      console.log(resp);
      this.vehicles = resp;
    });
  }
  save()
  {
    this.driverSalaryService.createDriverSalary(this.currentDriverSalary).subscribe(resp=>{
      this.currentDriverSalary=new DriverSalary();
      this.loadDriverSalaries();
    });
  }
  get(id) {
    this.driverSalaryService.getDriverSalary(id).subscribe(resp => {
      console.log(resp);
      this.currentDriverSalary = resp;
//this.selectedCompany=this.currentDriverSalary.company.toString();
//alert ("bjhbjh"+this.currentDriverSalary.company);
    })
  }

  delete(id) {
    this.driverSalaryService.deleteDriverSalary(id).subscribe(resp => {
      this.loadDriverSalaries();
    })
  }
  
  update()
  {
   
    
  }
  calculate() {
    let amount = 0;
    for (let i of this.currentDriverSalary.driverSalaryDetail) {
      if (i.it_d === null) {
        continue;
      }
      let sd = [] = i.it_d.split("-");
      let date = new Date(parseInt(sd[2]), parseInt(sd[1]), parseInt(sd[0]));
      i.itemDate = date;
      let id = [] = i.ti_d.split(":");
      let idate = new Date(parseInt(sd[2]), parseInt(sd[1]), parseInt(sd[0]), parseInt(id[0]), parseInt(id[1]), 0, 0);
      i.timeIn = idate;
      let od = [] = i.to_d.split(":");
      let odate = new Date(parseInt(sd[2]), parseInt(sd[1]), parseInt(sd[0]), parseInt(od[0]), parseInt(od[1]), 0, 0);
      i.timeOut = odate;
      let diff = Math.floor((odate.getTime() - idate.getTime()) / (1000 * 60));
      i.totalHour = diff / 60;
      i.hourCharge = ((i.totalHour - i.lessHour) * this.currentDriverSalary.driver.sal);
      i.totalCharge = parseFloat(i.hourCharge + '') + parseFloat(i.tripCharge + '') + parseFloat(i.parkCharge + '');
      amount = amount + i.totalCharge;
    }

    this.currentDriverSalary.totalAmount = amount;

    this.currentDriverSalary.grossAmount = this.currentDriverSalary.totalAmount - this.currentDriverSalary.gratuity - this.currentDriverSalary.deduction;
  }
  reset() {
    this.currentDriverSalary = new DriverSalary();
    this.addLine();
  }

  remove(index) {
    this.currentDriverSalary.driverSalaryDetail.splice(index, 1);
  }
}
