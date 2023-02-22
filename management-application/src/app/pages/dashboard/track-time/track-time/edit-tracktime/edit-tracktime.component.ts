import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user/user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';
import { catchError } from 'rxjs';

@Component({
  selector: 'app-edit-tracktime',
  templateUrl: './edit-tracktime.component.html',
  styleUrls: ['./edit-tracktime.component.css'],
})
export class EditTracktimeComponent implements OnInit {
  errorAlert: boolean = false;
  success: boolean = false;
  userDetails: any = {};
  editTrackTimeForm!: FormGroup;
  constructor(
    private userservice: UserService,
    private activatedroute: ActivatedRoute,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    let trackUserId = this.activatedroute.snapshot.params['trackUserId'];
    console.log(trackUserId);
    this.userservice.renderUserTrackTime(trackUserId).subscribe((response) => {
      this.userDetails = response;
      // prefilled form
      this.editTrackTimeForm = this.formBuilder.group({
        currentUserId: [localStorage.getItem('loggedInId')],
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
  cancelErrorAlert() {
    this.success = false;
    this.errorAlert = false;
  }
}
