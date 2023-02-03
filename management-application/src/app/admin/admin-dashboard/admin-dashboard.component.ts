import { Component, OnInit } from '@angular/core';
import { AdminPortalService } from 'src/app/services/admin-portal/admin-portal.service';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent implements OnInit {

  constructor(private adminportalservice: AdminPortalService) { }

  ngOnInit(): void {
    this.adminportalservice.renderData();
  }

}
