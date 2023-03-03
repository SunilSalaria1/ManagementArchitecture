import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { catchError } from 'rxjs';
import { CommonService } from 'src/app/services/common/common';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-track-time',
  templateUrl: './track-time.component.html',
  styleUrls: ['./track-time.component.css'],
})
export class TrackTimeComponent implements OnInit {
  loggedInUser: boolean = false;
  loggedInAdmin: boolean = false;
  getcurrentUserId: any;
  errorAlert: boolean = false;
  dateErrorAlert: boolean = false;
  success: boolean = false;
  // current date
  currentDate = new Date().toISOString().substring(0, 10);
  dateOnly: any;
  monthOnly: any;
  // check if date exists
  checkDateExists: any;
  // tracktime form
  trackTimeForm!: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    private route: Router,
    private userservice: UserService,
    private commonservice: CommonService
  ) {}

  ngDoCheck(): void {
    // date only
    this.dateOnly = this.currentDate.substring(8, 10);
    // month only
    this.monthOnly = this.currentDate.substring(5, 7);
  }

  ngOnInit(): void {
    console.log(this.getcurrentUserId);

    if (localStorage.getItem('loggedInUser') == 'true') {
      this.getcurrentUserId = localStorage.getItem('loggedInId');
      this.loggedInUser = true;
    }
    if (localStorage.getItem('loggedInAdmin') == 'true') {
      this.getcurrentUserId = this.commonservice.userDettailsId;
      this.loggedInAdmin = true;
    }
    this.trackTimeForm = this.formBuilder.group({
      currentUserId: [this.getcurrentUserId],
      date: [''],
      dateOnly: [],
      monthOnly: [],
      timeHours: ['00'],
      timeMinutes: ['00'],
      project: [''],
      task: [''],
      description: [''],
    });
  }
  trackTimeClick() {
    if (
      this.trackTimeForm.value.date == 0 ||
      this.trackTimeForm.value.project == 0 ||
      this.trackTimeForm.value.task == 0
    ) {
      this.trackTimeForm = this.formBuilder.group({
        currentUserId: [this.getcurrentUserId],
        date: [this.trackTimeForm.value.date, Validators.required],
        dateOnly: [this.trackTimeForm.value.dateOnly],
        monthOnly: [this.trackTimeForm.value.monthOnly],
        timeHours: [this.trackTimeForm.value.timeHours],
        timeMinutes: [this.trackTimeForm.value.timeMinutes],
        project: [this.trackTimeForm.value.project, Validators.required],
        task: [this.trackTimeForm.value.task, Validators.required],
        description: [this.trackTimeForm.value.description],
      });
    }
    if (this.trackTimeForm.valid) {
      // getting and checking the date for current user
      this.userservice.getData().subscribe((data) => {
        console.log(data);
        console.log('track time data is' + this.trackTimeForm.value.date);
        console.log(this.trackTimeForm.value.currentUserId);
        
        let checkDate = data.filter((item: any) => {
          return (
            item.date === this.trackTimeForm.value.date &&
            item.currentUserId === this.trackTimeForm.value.currentUserId
          );
        });
        console.log('check date is' + checkDate);
        this.checkDateExists = checkDate.length;
        console.log('checkdateexists is' + this.checkDateExists);
        if (this.checkDateExists == 0) {
          this.userservice
            .postTrackTime(this.trackTimeForm.value)
            .pipe(
              catchError(async (error) => {
                this.errorAlert = true;
              })
            )
            .subscribe((data) => {
              if (data) {
                this.commonservice.recentTrackTime = `${this.trackTimeForm.value.timeHours}.${this.trackTimeForm.value.timeMinutes}`;
                this.dateErrorAlert = false;
                this.success = true;
              }
            });
        }
        if (this.checkDateExists > 0) {
          this.dateErrorAlert = true;
        }
      });
    }
  }
  // cancel alert
  cancelErrorAlert() {
    this.success = false;
    this.errorAlert = false;
  }
  // cancel date alert
  cancelDateErrorAlert() {
    this.success = false;
    this.dateErrorAlert = false;
  }
  backToDashboard() {
    if (localStorage.getItem('loggedInUser') == 'true') {
      this.route.navigateByUrl('/dashboard');
    }
    if (localStorage.getItem('loggedInAdmin') == 'true') {
      this.route.navigateByUrl(
        `admin-portal/user-details/${this.commonservice.userDettailsId}`
      );
    }
  }
}
