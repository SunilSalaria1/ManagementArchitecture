import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonService } from './services/common/common';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'management-application';
  // change margin of main
  mainMargin: boolean = false;
  // show and hide aside, header
  asideHeader: boolean = this.commonservice.asideHeader;
  constructor(private commonservice: CommonService, private route: Router) {}
  ngDoCheck(): void {
    this.mainMargin = this.commonservice.aside;
    this.asideHeader = this.commonservice.asideHeader;
  }
  ngOnInit(): void {
    // localStorage.clear();
    if (localStorage.getItem('loggedInUser')) {
      this.commonservice.authentication = true;
      this.commonservice.aside = true;
      this.commonservice.asideHeader = true;
      this.commonservice.dashboard = true;
    }
    if (localStorage.getItem('loggedInAdmin')) {
      this.commonservice.authentication = true;
      this.commonservice.aside = true;
      this.commonservice.asideHeader = true;
      this.commonservice.adminPortal = true;
    }
  }
}
