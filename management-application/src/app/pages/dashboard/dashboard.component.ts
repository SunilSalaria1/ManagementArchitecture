import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonService } from 'src/app/services/common/common';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  constructor(private commonservice: CommonService, private route: Router) {}

  ngOnInit(): void {
    this.commonservice.aside = true;
    this.commonservice.asideHeader = true;
    if (localStorage.getItem('loggedInAdmin') == 'true') {
      this.route.navigateByUrl('/page-not-found');
      this.commonservice.aside = false;
      this.commonservice.asideHeader = false;
      this.commonservice.adminPortal = false;
    }
  }
}
