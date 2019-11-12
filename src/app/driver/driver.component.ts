import { Component, OnInit } from '@angular/core';
import { DriverService } from '../driver.service';
import { Driver } from '../util/driver';
import {PageChangedEvent} from 'ngx-bootstrap/pagination/public_api';
import { FormGroup, FormControl, Validators } from '../../../node_modules/@angular/forms';


@Component({
  selector: 'app-driver',
  templateUrl: './driver.component.html',
  styleUrls: ['./driver.component.css']
})
export class DriverComponent implements OnInit {
form=new FormGroup({
  name:new FormControl('',Validators.required)
})

  filterBy: string = null;
  group:FormGroup;
  filterText: string = null;
    
  pageSize: number = 10;
   
  returnedArray: Driver[] = [];
  currentDriver: Driver = null;
  driverList = [];

  constructor(private driverService: DriverService) {
    this.currentDriver = new Driver();
  }

  ngOnInit() {
    this.loadAllDriver();
    this.group=new FormGroup({
      name:new FormControl('',Validators.compose([Validators.required]))
    });
  }

  filter() {
    
    this.driverList=[];
        this.driverService.getAllDriver().subscribe(resp => {
          for (let d of resp) {
            if (this.filterBy === 'Id'&& d.active===true) {
              if (d.id+'' === this.filterText) {
                this.driverList.push(d);
     
             }
            }
    
           
     if (this.filterBy === 'Name' &&  d.active===true) {
              if (d.name === this.filterText) {
                this.driverList.push(d);
              }
            }
          }
          if (this.driverList.length < this.pageSize) {
            this.returnedArray = this.driverList.slice(0, this.driverList.length);
          } else {
            this.returnedArray = this.driverList.slice(0, this.pageSize);
          }
        })
      }
    
      pageChanged(event: PageChangedEvent): void
      {

         const startItem = (event.page - 1) * event.itemsPerPage;
         const endItem = event.page * event.itemsPerPage;
         this.returnedArray = this.driverList.slice(startItem, endItem);
      }
     
       clearfilter()
       {
        this.filterText=null;
        this.filterBy=null;
        this.loadAllDriver();
       }
  loadAllDriver() {
    this.driverList =[];
    this.driverService.getAllDriver().subscribe(resp => {
      for(let d of resp)
      {
        if(d.active===true)
        this.driverList.push(d);
      }
      //this.driverList = resp;
      this.returnedArray = this.driverList.slice(0, this.pageSize);
 
    })
  }

  edit(driver) {
    this.currentDriver = driver;
  }

  cancel() {
    this.currentDriver = new Driver();
    this.loadAllDriver();
  }

  delete(driver) {
    driver.active=false;
    //this.driverService.deleteDriver(driver.id).subscribe(resp => {
      //alert("Driver has been deleted successfully.");
      this.driverService.updateDriver(driver).subscribe(resp => {
     
      this.loadAllDriver();
      this.currentDriver=new Driver();
    })
  }

  save() {
    
    this.driverService.createDriver(this.currentDriver).subscribe(resp => {
      //alert("Driver has been created successfully.");
      this.currentDriver = new Driver();
      this.loadAllDriver();
    })
  }

  update() {
    this.driverService.updateDriver(this.currentDriver).subscribe(resp => {
      //alert("Driver has been updated successfully.");
      this.currentDriver = new Driver();
      this.loadAllDriver();
    });
  }


}
