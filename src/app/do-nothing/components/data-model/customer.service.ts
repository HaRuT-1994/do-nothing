import { Injectable } from "@angular/core";
import { of } from "rxjs";

@Injectable()
export class CustomerService {
  getCustomers() {
    return of({customers: [
      {name: "Simon", company: "FC", country: "AU" },
      {name: "George", company: "Alpha", country: "GE" },
      {name: "John", company: "Bet", country: "BR" }
    ]});
  }
}