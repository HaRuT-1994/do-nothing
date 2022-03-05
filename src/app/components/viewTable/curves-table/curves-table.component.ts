import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppConfig } from 'src/app/config/app.config';
import { ConfigCurvesService } from 'src/app/services/config-curves.service';

@Component({
  selector: 'app-curves-table',
  templateUrl: './curves-table.component.html',
  styleUrls: ['./curves-table.component.scss']
})
export class CurvesTableComponent implements OnInit {
  curves = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  constructor(private router: Router, private curvesService: ConfigCurvesService) { }

  ngOnInit(): void {
  }

  onEditRow(ev) {
    this.curvesService.onEditRow(ev);
    this.router.navigate([AppConfig.routes.edit.configCurves]);    
  }

  onDeleteRow() {
    this.curves = [];
    //hide row and send api
  }
}
