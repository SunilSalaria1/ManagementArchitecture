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
    if (this.commonservice.authentication) {
      this.route.navigateByUrl('/dashboard');
    }
  }
}
