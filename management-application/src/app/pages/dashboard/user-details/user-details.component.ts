import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AdminPortalService } from 'src/app/services/admin-portal/admin-portal.service';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css'],
})
export class UserDetailsComponent implements OnInit {
  userDetails: any = [];
  constructor(
    private adminportalservice: AdminPortalService,
    private activatedroute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    // read id param from url and render the user details
    let userId = this.activatedroute.snapshot.params['userId'];
    this.adminportalservice.renderUserData(userId).subscribe((data) => {
    this.userDetails = data;
    });
  }
}
