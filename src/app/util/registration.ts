import { Company } from "./company";
import { Driver } from "./driver";
import { Vehicle } from "./vehicle";
import { Invoice } from "./invoice";
export class Registration {
    id:number;
    arrivalDate:Date;
    comments:String;
    company:Company =null;
    departureDate:Date;
    guestName:String;
    reservationStatus:String="FRESH";
    wing:String;
    driver:Driver;
    vehicle: Vehicle;
    active:Boolean=true;
	 invoiceId:String;
     arvl_dt:String;
     dpt_d:String;
}
