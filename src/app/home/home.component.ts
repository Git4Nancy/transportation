import { Component, OnInit } from '@angular/core';
import { Invoice } from '../util/invoice';
import { Company } from '../util/company';
import { Driver } from '../util/driver';
import { Vehicle } from '../util/vehicle';
import { DataService } from '../data.service';
import { InvoiceItem } from '../util/invoice.item';
import { DriverService } from '../driver.service';
import { CompanyService } from '../company.service';
import { RegistrationService } from '../registration.service';
import { VehicleService } from '../vehicle.service';
import { FormGroup,FormControl, Validators } from '../../../node_modules/@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  form:FormGroup;
  valj;
  printing: boolean = false;
  title = 'canada';
  invoices: Invoice[] = [];
  companies: Company[] = [];
  drivers: Driver[] = [];
  vehicles: Vehicle[] = [];
  itemList: InvoiceItem[] = [];
  filterText: String = null;
  invoice: Invoice = null;
  comSelected: Number;
  vehSelected: Number;
  driverSelected: Number;
 vehicle:Vehicle;
  amount = 0;
  try:any="new";
  temoraryInvoiceItem:InvoiceItem;
  constructor(private dataServices: DataService, private driverService: DriverService, private companyService: CompanyService, private vehicleService: VehicleService, private registrationService: RegistrationService) {

  }
  ngOnInit() {
    this.form=new FormGroup({
      name:new FormControl("",Validators.compose([Validators.required])),
      rate:new FormControl("",Validators.compose([Validators.required,Validators.pattern("^[0-9]*$"),Validators.min(1),Validators.max(256)]))
     });
    this.invoice = new Invoice();
    this.invoice.vehicle = new Vehicle();
    this.invoice.company = new Company();
    this.invoice.driver = new Driver();
    this.vehicle=new Vehicle();
    this.itemList = [];
    this.invoice.invoiceItem = this.itemList;
    //this.addLine();
    this.loadInvoices();
    this.loadCompanies();
    this.loadDrivers();
    this.loadVehicles();

  }
  onComSelected(val: any) {
   
    this.invoice.company.id=val;
  this.loadCompany();
  }
  onDriverSelected(val: any) {
    this.invoice.driver.id=val;
  }
  onVehSelected(val: any) {
    this.invoice.vehicle.id=val;
    this.loadVehicle();
    
  }
  getInvoice(id) {
    this.dataServices.getInvoice(id).subscribe(resp => {
      for(let a of resp.invoiceItem)
      console.log(resp.invoiceItem.itemDate);
      this.invoice = resp;
      this.comSelected = this.invoice.company.id;
      this.driverSelected = this.invoice.driver.id;
      this.vehSelected = this.invoice.vehicle.id;
     //console.log(this.invoice.invoiceItem);
    });

  }
 
  addLine() {
    this.invoice.invoiceItem.push(new InvoiceItem());
      }
  remove(index) {
    console.log(this.invoice.invoiceItem.splice(index, 1));

  }
  loadInvoices() {
    this.dataServices.getAllInvoices().subscribe(resp => {
      console.log(resp);
      this.invoices = resp;

    });

  }
  loadCompanies() {
    this.companyService.getAllCompanies().subscribe(resp => {
      console.log(resp);
      for (let d of resp) {
        if (d.active === true)
          this.companies.push(d);
      }
    });
  }
  loadDrivers() {
    this.driverService.getAllDriver().subscribe(resp => {
      console.log(resp);
      for (let d of resp) {
        if (d.active === true)
          this.drivers.push(d);
      }
    });
  }
  loadVehicles() {
    this.vehicleService.getAll().subscribe(resp => {
      console.log(resp);
      for (let v of resp) {
        if (v.active === true)
          this.vehicles.push(v);
      }

    });
  }
  loadVehicle() {
    this.vehicleService.get(this.invoice.vehicle.id).subscribe(resp => {
      this.invoice.vehicle = resp;
      this.invoice.rate=this.invoice.vehicle.rate;
    });
  }
  loadDriver() {
    this.driverService.getDriver(this.invoice.driver.id).subscribe(resp => {
      this.invoice.driver = resp;

    });
  }
  loadCompany() {
    this.companyService.getCompany(this.invoice.company.id).subscribe(resp => {
      this.invoice.company = resp;
      
    });
  }


  clearfilter() {
    this.filterText = null;

    this.loadInvoices();
  }
  filter() {

    this.invoices = [];
    this.dataServices.getInvoice(this.filterText).subscribe(resp => {
      if (resp != null)
        this.invoices.push(resp);


    })
  }
  deleteInvoice(id) {
    this.dataServices.deleteInvoice(id).subscribe(resp => {
      this.loadInvoices();
    })
  }

  save() {
console.log(this.invoice);
    this.dataServices.saveInvoice(this.invoice).subscribe(resp => {
      // console.log(resp);
      this.invoice = new Invoice();
      this.loadInvoices();
      this.invoice.vehicle = new Vehicle();
    this.invoice.driver = new Driver();
    this.invoice.company = new Company();
      this.comSelected = null;
      this.driverSelected = null;
      this.vehSelected = null;
    });
  }
  update() {
    this.dataServices.updateInvoice(this.invoice).subscribe(resp => {
      this.reset();

    });
    this.loadInvoices();
  }

  calculate2() {
    this.amount = 0;
    for (let i of this.invoice.invoiceItem) {

      if (i.it_d === null) {
        continue;
      }
      i.totalCharge = parseFloat(i.hourCharge + '') + parseFloat(i.tripCharge + '') + parseFloat(i.parkCharge + '');
      this.amount = this.amount + i.totalCharge;
    }
    this.invoice.totalAmount = this.amount;

    this.invoice.grossAmount = this.invoice.totalAmount - this.invoice.gratuity - this.invoice.deduction;
  }
  calculate() {
    this.amount = 0;

    for (let i of this.invoice.invoiceItem) {
      if (i.it_d === null) {
        continue;
      }
      this.loadVehicle();
      let id = [] = i.ti_d.split(":");
      let od = [] = i.to_d.split(":");
      let idate = new Date( 2000,0,0, parseInt(id[0]), parseInt(id[1]),0);
      let odate = new Date(2000,0,0,parseInt(od[0]), parseInt(od[1]), 0);
      i.timeOut = odate;
      i.timeIn=idate;
      let diff = Math.floor(i.timeOut.getTime()-i.timeIn.getTime()) / (1000 * 60);
      i.totalHour = (diff / 60) - i.lessHour;
      i.hourCharge = ((i.totalHour) * this.invoice.rate);
      i.totalCharge = parseFloat(i.hourCharge + '') + parseFloat(i.tripCharge + '') + parseFloat(i.parkCharge + '');
      this.amount = this.amount + i.totalCharge;
    }

    this.invoice.totalAmount = this.amount;

    this.invoice.grossAmount = this.invoice.totalAmount - this.invoice.gratuity - this.invoice.deduction;
  }

  reset() {
    this.comSelected = null;
    this.driverSelected = null;
    this.vehSelected = null;
    this.invoice = new Invoice();
    this.invoice.vehicle = new Vehicle();
    this.invoice.driver = new Driver();
    this.invoice.company = new Company();
    this.itemList = [];
    this.invoice.invoiceItem = this.itemList;
    this.valj = null;
  }

  print() {
    window.print();
  }
}
