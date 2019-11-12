import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { StorageServiceModule } from 'angular-webstorage-service';
import {AuthInterceptor} from './httpinterceptor/auth.interceptor';
import { AppHomeComponent } from './app-home/app-home.component';
import {MatTableModule} from '@angular/material/table';
import {
  HttpClientModule,
  HttpClient,
  HTTP_INTERCEPTORS
} from "@angular/common/http";

import { AppComponent } from './app.component';
import { Router, Routes, RouterModule } from '@angular/router';
import { DataService } from './data.service';
import { DriverComponent } from './driver/driver.component';
import { Driver } from 'selenium-webdriver/opera';
import { CompanyComponent } from './company/company.component';
import { HeaderComponent } from './header/header.component';
import { VehicleComponent } from './vehicle/vehicle.component';
import { HomeComponent } from './home/home.component';
import { DriverService } from './driver.service';
import {VehicleService} from './vehicle.service';
import {CompanyService} from './company.service';
import { RegistrationComponent } from './registration/registration.component';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { RegistrationService } from './registration.service';
import { ViewComponent } from './view/view.component';
import { DriverSalaryComponent } from './driver-salary/driver-salary.component';
import { DriverSalayService } from './driver-salay.service';
import { PrintInvoiceComponent } from './print-invoice/print-invoice.component';
import { LoginComponent } from './login/login.component';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatSortModule ,MatButtonModule,MatNativeDateModule,MatFormFieldModule,MatInputModule,MatPaginatorModule } from '@angular/material';
import { LogoutComponent } from './logout/logout.component';


const route: Routes = [
  {path: "", component: LoginComponent},
   {path: "login", component: LoginComponent},
  { path: '', component: AppHomeComponent,
       children: [
    { path: "invoice", component: HomeComponent },
    { path: "logout", component: LogoutComponent },
    
    { path: "driver", component: DriverComponent },
    { path: "company", component: CompanyComponent },
    { path: "vehicle", component: VehicleComponent },
    { path: "view/:id", component:ViewComponent},
    { path: "registration",component:RegistrationComponent},
    {path: "driversalary", component:DriverSalaryComponent},
    {path:"printinvoice", component:PrintInvoiceComponent}

  ]}
 
]

@NgModule({
  declarations: [
    AppComponent,
    AppHomeComponent,
    DriverComponent,
    CompanyComponent,
    HeaderComponent,
    VehicleComponent,
    HomeComponent,
    RegistrationComponent,
    ViewComponent,
    DriverSalaryComponent,
    PrintInvoiceComponent,
    LoginComponent,
    LogoutComponent,
    
  ],
  imports: [
    RouterModule.forRoot(route,{useHash: true}),
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    StorageServiceModule,
    MatButtonModule,
    MatPaginatorModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatFormFieldModule,
    MatTableModule,
    MatInputModule,
    MatSortModule ,
   
   // BsDatepickerModule.forRoot(),
    ReactiveFormsModule,
    HttpClientModule,
    PaginationModule.forRoot()
  ],
  providers: [DataService,DriverService,VehicleService,
    CompanyService,RegistrationService,DriverSalayService,
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }],
  bootstrap: [AppComponent]
})
export class AppModule { }
