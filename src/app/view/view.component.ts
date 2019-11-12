import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import {Invoice} from '../util/invoice';
import {DriverService} from '../driver.service';

import { ActivatedRoute } from '../../../node_modules/@angular/router';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css']
})
export class ViewComponent implements OnInit {
  invoiceId;
invoiceList=[];
invoice:Invoice=null;
  constructor(private dataService: DataService,private driverService:DriverService,private router:ActivatedRoute) 
  {this.invoiceId=router.snapshot.params["id"];}

  ngOnInit() {
    this.getAllInvoice();

  }
  print() 
  {
    window.print();
  }
  getInvoice() {
    this.dataService.getInvoice(this.invoiceId).subscribe(resp => {
      console.log(resp);
      this.invoice = resp;
    })
  }
  getAllInvoice()
  {this.invoiceList=[];
    this.dataService.getAllInvoices().subscribe(resp=>{
      for(let i of resp)
      {
        if(this.invoiceId===i.id+'' && i.active===true && i.status==="UN-PAID")
        { this.invoiceList.push(i); }
      }
      console.log(this.invoiceList);
    });
  }
}
