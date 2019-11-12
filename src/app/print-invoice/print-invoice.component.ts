import { Component, OnInit } from '@angular/core';
import {DataService} from '../data.service';
import { Invoice } from '../util/invoice';
import { CompanyService } from '../company.service';
import { Company } from '../util/company';
@Component({
  selector: 'app-print-invoice',
  templateUrl: './print-invoice.component.html',
  styleUrls: ['./print-invoice.component.css']
})
export class PrintInvoiceComponent implements OnInit {
  invoices: Invoice[] = [];
  filterText: String = null;
  invoice: Invoice = null;
  comSelected:Number;
  companies: Company[] = [];
  constructor(private dataServices: DataService,private companyService: CompanyService) { }

  ngOnInit() {
    this.invoice = new Invoice();
    this.loadCompanies();
  }
  loadCompanies() {
    this.companyService.getAllSortedCompanies().subscribe(resp => {
      console.log(resp);
      for (let d of resp) {
        if (d.active === true)
          this.companies.push(d);
      }
    });
  }
  onComSelected(val:any)
  {
   
   this.comSelected=this.invoice.company.id;
   this.invoice.company.id=val;
   this.loadCompany();
  }
  print() {
    window.print();
  }
  loadCompany()
  {
    this.companyService.getCompany(this.invoice.company.id).subscribe(resp=>
    {
      this.invoice.company=resp;
      //this.invoice.company.id=resp.id;
     // alert("Load company "+this.invoice.company.id);
    });
    }
  clearfilter() {
    this.filterText = null;
    this.invoice=new Invoice();
    this.invoices = [];
  }
  filter() {

    this.invoices = [];
    this.dataServices.getAllInvoices().subscribe(resp => {
      for (let d of resp) {
        if (this.invoice.company.name === d.company.name && d.status === "UN-PAID") {

          this.invoices.push(d);

        }
      }

    })
  }
  
}
