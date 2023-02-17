import { Component, OnInit, SimpleChanges } from '@angular/core';
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
  error: boolean = false;
  success: boolean = false;
  // current date
  currentDate = new Date().toISOString().substring(0, 10);
  // tracktime form
  trackTimeForm!: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    private route: Router,
    private userservice: UserService,
    private commonservice: CommonService
  ) {}

  ngDoCheck(changes: SimpleChanges): void {
    console.log(this.currentDate);
  }

  ngOnInit(): void {
    console.log(this.commonservice.asideHeader);
    this.trackTimeForm = this.formBuilder.group({
      currentUserId: [localStorage.getItem('loggedInId')],
      date: [''],
      timeHours: ['-'],
      timeMinutes: ['-'],
      project: [''],
      task: [''],
      description: [''],
    });
    // auth guard
    if (localStorage.getItem('loggedInAdmin') == 'true') {
      this.route.navigateByUrl('/page-not-found');
    }
  }
  trackTimeClick() {
    if (
      this.trackTimeForm.value.date == 0 ||
      this.trackTimeForm.value.project == 0 ||
      this.trackTimeForm.value.task == 0
    ) {
      this.trackTimeForm = this.formBuilder.group({
        currentUserId: [localStorage.getItem('loggedInId')],
        date: [this.trackTimeForm.value.date, Validators.required],
        timeHours: [this.trackTimeForm.value.timeHours],
        timeMinutes: [this.trackTimeForm.value.timeMinutes],
        project: [this.trackTimeForm.value.project, Validators.required],
        task: [this.trackTimeForm.value.task, Validators.required],
        description: [this.trackTimeForm.value.description],
      });
    }
    if (this.trackTimeForm.valid) {
      this.userservice
        .postTrackTime(this.trackTimeForm.value)
        .pipe(
          catchError(async (error) => {
            this.error = true;
          })
        )
        .subscribe((data) => {
          this.commonservice.recentTrackTime = `${this.trackTimeForm.value.timeHours}:${this.trackTimeForm.value.timeMinutes}`;
          this.success = true;
        });
    }
  }
  // cancel alert
  cancelErrorAlert() {
    this.success = false;
    this.error = false;
  }
}
