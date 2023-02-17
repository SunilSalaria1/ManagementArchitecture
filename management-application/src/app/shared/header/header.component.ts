import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonService } from 'src/app/services/common/common';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  // show and hide aside, header
  asideHeader: boolean = this.commonservice.asideHeader;
  aside: boolean = this.commonservice.aside;
  constructor(private commonservice: CommonService, private route: Router) {}

  ngOnInit(): void {}

  ngDoCheck(): void {
    this.asideHeader = this.commonservice.asideHeader;
    this.aside = this.commonservice.aside;
  }
  // toggle function
  asideToggle() {
    this.commonservice.aside = !this.commonservice.aside;
  }
  // logout
  logout() {
    localStorage.clear();
    this.commonservice.authentication = false;
    this.commonservice.aside = false;
    this.commonservice.asideHeader = false;
  }
}
