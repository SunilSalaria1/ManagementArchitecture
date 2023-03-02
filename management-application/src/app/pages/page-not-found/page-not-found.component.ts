import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonService } from 'src/app/services/common/common';

@Component({
  selector: 'app-page-not-found',
  templateUrl: './page-not-found.component.html',
  styleUrls: ['./page-not-found.component.css'],
})
export class PageNotFoundComponent implements OnInit {
  constructor(private commonservice: CommonService, private route: Router) {}

  ngOnInit(): void {
    this.commonservice.asideHeader = false;
    this.commonservice.aside = false;
  }
  backToHome() {
    if (localStorage.getItem('loggedInUser') == 'true') {
      this.route.navigateByUrl('/dashboard');
    }
    if (localStorage.getItem('loggedInAdmin') == 'true') {
      this.route.navigateByUrl('/admin-portal');
    } else {
      this.route.navigateByUrl('/login');
    }
  }
}
