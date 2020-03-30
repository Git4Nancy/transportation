import { Invoice } from "./invoice";

export class InvoiceItem {
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
    invoice:Invoice;  
   
    to_d: string;
    ti_d: string;
    it_d: string;
}