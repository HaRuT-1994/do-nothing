import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { Location } from '@angular/common';
import { LazyLoadEvent } from 'primeng/api';
import { CustomerService } from './customer.service';

@Component({
  selector: 'app-data-model',
  templateUrl: './data-model.component.html',
  styleUrls: ['./data-model.component.scss'],
  providers: [CustomerService]
})
export class DataModelComponent implements OnInit {
  customers = [];
  totalRecords: number;
  cols: any[];
  isLoading: boolean;
  

  items: MenuItem[] = [
    {
      label: 'Alpha',
      routerLink: '' 
    },
    {
      label: 'Bravo',
      routerLink: '' 
    }
  ];
  constructor(private location: Location, private customerService: CustomerService) { }

  ngOnInit(): void {
    this.isLoading = true;
    setTimeout(() => {
        this.customerService.getCustomers().subscribe(res => {
              this.customers = res.customers;
              // this.totalRecords = res.totalRecords;
              this.isLoading = false;
            })
    }, 1000)
    
  }

  onAddAsset() {
    console.log("add");
    
  }

  onRemoveAsset() {
    console.log("delete");
    
  }

  onEditAsset() {
    console.log("edit");
    
  }

  goBack(): void {
    this.location.back();
  }
}
