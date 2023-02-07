import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { catchError } from 'rxjs';
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
    private activatedroute: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    // read id param from url and render the user details
    let userId = this.activatedroute.snapshot.params['userId'];
    this.adminportalservice
      .renderUserData(userId)
      .pipe(
        catchError(async (error) => {
          if (error.status == 404) {
            this.router.navigate(['/page-not-found']);
          }
        })
      )
      .subscribe((data) => {
        this.userDetails = data;
      });
  }
}
