import { Component, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { CommonService } from './services/common/common';
import { UserService } from './services/user/user.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'management-application';
  // loader
  loader: boolean = true;
  // change margin of main
  mainMargin: boolean = false;
  // show and hide aside, header
  asideHeader: boolean = this.commonservice.asideHeader;

  // @HostListener('window:beforeunload', ['$event'])
  // beforeunloadHandler(event: any) {
  //   event.preventDefault();
  //  localStorage.clear();
  //   return false;
  // }

  constructor(private commonservice: CommonService) {}
  ngDoCheck(): void {
    this.mainMargin = this.commonservice.aside;
    this.asideHeader = this.commonservice.asideHeader;
  }
  ngOnInit(): void {
    setTimeout(() => {
      this.loader = false;
    }, 1000);
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
