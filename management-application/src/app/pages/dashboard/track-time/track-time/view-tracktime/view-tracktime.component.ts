import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonService } from 'src/app/services/common/common';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-view-tracktime',
  templateUrl: './view-tracktime.component.html',
  styleUrls: ['./view-tracktime.component.css'],
})
export class ViewTracktimeComponent implements OnInit {
  viewTrackTimeDetails:any = {};
  constructor(
    private userservice: UserService,
    private activatedroute: ActivatedRoute,
    private route: Router,
    private commonservice: CommonService
  ) {}

  ngOnInit(): void {
    let trackUserId = this.activatedroute.snapshot.params['trackUserId'];
    console.log(trackUserId);
    this.userservice.renderUserTrackTime(trackUserId).subscribe((response) => {
      this.viewTrackTimeDetails = response;
      console.log(this.viewTrackTimeDetails); 
    });
  }
  // back to dashboard
  backToDashboard() {
    if (localStorage.getItem('loggedInUser') == 'true') {
      this.route.navigateByUrl('/dashboard');
    }
    if (localStorage.getItem('loggedInAdmin') == 'true') {
      this.route.navigateByUrl(
        `/user-details/${this.commonservice.userDettailsId}`
      );
    }
  }
}
