import { Company } from "./company";
import { Driver } from "./driver";
import { Vehicle } from "./vehicle";
import { InvoiceItem } from "./invoice.item";

export class Invoice {
    id: number;
    active:boolean=true;
    dated: Date;
    description:string;
    gratuity: number = 0;
    grossAmount: number = 0;
    guest: string;
    status: string = 'UN-PAID';
    taxAmount: number = 0;
    taxRate: number = 0;
    totalAmount: number = 0;
    company: Company=null;
    driver: Driver=null;
    vehicle: Vehicle=null;
    invoiceItem: InvoiceItem[] = [];
    deduction: number = 0;
    rate:number=0;
}