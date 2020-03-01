import { Component, OnInit } from '@angular/core';
import { Company } from '../util/company';
import { CompanyService } from '../company.service';
import { PageChangedEvent } from '../../../node_modules/ngx-bootstrap/pagination/public_api';
import { FormGroup,FormControl, Validators } from '../../../node_modules/@angular/forms';

@Component({
  selector: 'app-company',
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.css']
})
export class CompanyComponent implements OnInit {
  form1:FormGroup;
  filterBy: string = null;
  filterText: String = null;
  pageSize:number=2;
  returnedArray=[];

  currentCompany: Company = null;
  companyList = [];
  constructor(private companyService: CompanyService) {
    this.currentCompany = new Company();
  }
  ngOnInit() {
    this.loadAllCompany();
    this.form1=new FormGroup({
      name:new FormControl("",Validators.compose([Validators.required])),
      address:new FormControl("",Validators.compose([Validators.required])),
      phone:new FormControl("",Validators.compose([Validators.required])),
      fax:new FormControl(),
      detail:new FormControl()      
      // rate:new FormControl("",Validators.compose([Validators.required,Validators.pattern("^[0-9]*$"),Validators.min(1),Validators.max(256)]))
     });
  }
  filter() {
    this.companyList = [];
    this.companyService.getAllCompanies().subscribe(resp => {
      for (let d of resp) {
        if (this.filterBy === 'Id')
          if (this.filterText === d.id + '') {
            this.companyList.push(d);
          }

        if (this.filterBy === 'Company')

          if (this.filterText === d.name) {
            this.companyList.push(d);
          }
      }
      
this.returnedArray=this.companyList.length<this.pageSize ? this.companyList.slice(0,this.companyList.length):this.companyList.slice(0,this.pageSize);
    })
  }
  m(event:PageChangedEvent):void
  {
    
    const arg1=(event.page-1)*event.itemsPerPage;
    const arg2=(event.page)*event.itemsPerPage;
    this.returnedArray=this.companyList.slice(arg1,arg2);
  }

  clearFilter()
  {
    this.filterBy=null;
    this.filterText=null;
    this.loadAllCompany();
  }
  loadAllCompany() {
    this.companyList=[];
    this.companyService.getAllCompanies().subscribe(resp => {
      for(let c of resp)
      {
        if(c.active===true)
        this.companyList.push(c);
      }
      this.returnedArray=this.companyList.slice(0,this.pageSize);
    })
  }

  update() {
    this.companyService.updateCompany(this.currentCompany).subscribe(resp => {
      alert("Company Updated");
      this.currentCompany = new Company();
      this.loadAllCompany();
    })
  }
  cancel() { 
    
    this.currentCompany = new Company(); 
  }
  save() {

    this.companyService.saveCompany(this.currentCompany).subscribe(resp => {
      //alert("Company Saved");
      this.currentCompany = new Company();
      this.loadAllCompany();
    })
  }
  edit(company) { this.currentCompany = company; }

  delete(company) {
    company.active=false;
    this.companyService.updateCompany(this.currentCompany).subscribe(resp => {
        
    });
    this.loadAllCompany();
  }
}
