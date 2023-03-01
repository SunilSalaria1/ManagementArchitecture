import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonService } from 'src/app/services/common/common';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  loggedInUser: boolean = false;
  loggedInAdmin: boolean = false;
  // show and hide aside, header
  asideHeader: boolean = this.commonservice.asideHeader;
  aside: boolean = this.commonservice.aside;
  constructor(private commonservice: CommonService, private route: Router) {}

  ngOnInit(): void {
    if (localStorage.getItem('loggedInUser')) {
      this.loggedInUser = true;
    }
    if (localStorage.getItem('loggedInAdmin')) {
      this.loggedInAdmin = true;
    }
  }

  ngDoCheck(): void {
    this.asideHeader = this.commonservice.asideHeader;
    this.aside = this.commonservice.aside;
    if (localStorage.getItem('loggedInUser')) {
      this.loggedInUser = true;
    }
    if (localStorage.getItem('loggedInAdmin')) {
      this.loggedInAdmin = true;
    }
  }
  // toggle function
  asideToggle() {
    this.commonservice.aside = !this.commonservice.aside;
  }
  // logout
  logout() {
    localStorage.clear();
    this.route.navigateByUrl('/login');
    this.commonservice.authentication = false;
    this.commonservice.aside = false;
    this.commonservice.asideHeader = false;
  }
  profile() {
    if (localStorage.getItem('loggedInUser')) {
      this.route.navigateByUrl('/dashboard/user-profile');
    }

    if (localStorage.getItem('loggedInAdmin')) {
      this.route.navigateByUrl('/admin-portal/admin-profile');
    }
  }
}
