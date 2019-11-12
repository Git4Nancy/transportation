import { DriverSalary } from "./driver-salary";
export class DriverSalaryDetail {
    id: number;
   
    itemDate: Date;
    description: string;
    hourCharge: number = 0;
    lessHour: number = 0;
    parkCharge: number = 0;
    timeIn: Date;
    timeOut: Date;
    totalCharge: number = 0;
    totalHour: number = 0;
    tripCharge: number = 0;
    driverSalary:DriverSalary;  
    to_d: string;
    ti_d: string;
    it_d: string;
}
