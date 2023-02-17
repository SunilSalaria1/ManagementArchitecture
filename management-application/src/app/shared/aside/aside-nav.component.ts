import { Component, OnInit } from '@angular/core';
import { CommonService } from 'src/app/services/common/common';

@Component({
  selector: 'app-aside-nav',
  templateUrl: './aside-nav.component.html',
  styleUrls: ['./aside-nav.component.css'],
})
export class AsideNavComponent implements OnInit {
  aside: boolean = this.commonservice.aside;
  // show and hide aside, header
  asideHeader: boolean = this.commonservice.asideHeader;
  // dashboard
  dashboard: boolean = this.commonservice.dashboard;
  // admin-portal
  adminPortal: boolean = this.commonservice.dashboard;

  constructor(private commonservice: CommonService) {}

  ngOnInit(): void {}
  ngDoCheck(): void {
    this.aside = this.commonservice.aside;
    this.asideHeader = this.commonservice.asideHeader;
    this.dashboard = this.commonservice.dashboard;
    this.adminPortal = this.commonservice.adminPortal;
  }
}
