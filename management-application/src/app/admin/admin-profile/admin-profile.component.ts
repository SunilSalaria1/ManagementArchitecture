import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AdminPortalService } from 'src/app/services/admin-portal/admin-portal.service';

@Component({
  selector: 'app-admin-profile',
  templateUrl: './admin-profile.component.html',
  styleUrls: ['./admin-profile.component.css'],
})
export class AdminProfileComponent implements OnInit {
  loggedUserData:any = {};
  constructor(
    private adminportalservice: AdminPortalService,
    private activatedroute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    let loggedInId = localStorage.getItem('loggedInId');
    this.adminportalservice
      .renderUserData(loggedInId)
      .subscribe( (response) => {
      this.loggedUserData = response;
      });
  }
}
