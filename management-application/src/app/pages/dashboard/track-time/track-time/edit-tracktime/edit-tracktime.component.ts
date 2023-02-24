import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user/user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';
import { catchError } from 'rxjs';
import { CommonService } from 'src/app/services/common/common';

@Component({
  selector: 'app-edit-tracktime',
  templateUrl: './edit-tracktime.component.html',
  styleUrls: ['./edit-tracktime.component.css'],
})
export class EditTracktimeComponent implements OnInit {
  loggedInAdmin: boolean = false;
  loggedInUser: boolean = false;
  errorAlert: boolean = false;
  success: boolean = false;
  userDetails: any = {};
  editTrackTimeForm!: FormGroup;
  constructor(
    private userservice: UserService,
    private activatedroute: ActivatedRoute,
    private formBuilder: FormBuilder,
    private commonservice: CommonService,
    private router: Router
  ) {}

  ngOnInit(): void {
    console.log(this.loggedInAdmin, this.loggedInUser);
    if (localStorage.getItem('loggedInUser') == 'true') {
      this.loggedInUser = true;
    }
    if (localStorage.getItem('loggedInAdmin') == 'true') {
      this.loggedInAdmin = true;
    }
    let trackUserId = this.activatedroute.snapshot.params['trackUserId'];
    this.userservice.renderUserTrackTime(trackUserId).subscribe((response) => {
      this.userDetails = response;
      // prefilled form
      if (localStorage.getItem('loggedInAdmin') == 'true') {
        this.commonservice.dashboard = false;
      }
      if (localStorage.getItem('loggedInUser') == 'true') {
        this.commonservice.adminPortal = false;
      }
      this.editTrackTimeForm = this.formBuilder.group({
        currentUserId: [this.userDetails.currentUserId],
        date: [this.userDetails.date],
        dateOnly: [this.userDetails.dateOnly],
        monthOnly: [this.userDetails.monthOnly],
        timeHours: [this.userDetails.timeHours],
        timeMinutes: [this.userDetails.timeMinutes],
        project: [this.userDetails.project],
        task: [this.userDetails.task],
        description: [this.userDetails.description],
      });
    });
  }
  editTrackTimeDetail(data: any) {
    let trackUserId = this.activatedroute.snapshot.params['trackUserId'];
    this.userservice
      .editTrackTimeDetail(trackUserId, data)
      .pipe(
        catchError(async (error) => {
          this.errorAlert = true;
        })
      )
      .subscribe((result) => {
        this.success = true;
        console.log(result);
      });
  }
  // cancelErrorAlert
  cancelErrorAlert() {
    this.success = false;
    this.errorAlert = false;
  }
  // backToDashboard
  backToDashboard() {
    if (localStorage.getItem('loggedInUser') == 'true') {
      this.router.navigateByUrl('/dashboard');
    }
    if (localStorage.getItem('loggedInAdmin') == 'true') {
      this.router.navigateByUrl(
        `/user-details/${this.userDetails.currentUserId}`
      );
    }
  }
}
