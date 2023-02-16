import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-track-time',
  templateUrl: './track-time.component.html',
  styleUrls: ['./track-time.component.css'],
})
export class TrackTimeComponent implements OnInit {
  // tracktime form
  trackTimeForm!: FormGroup;
  constructor(private formBuilder: FormBuilder, private route: Router) {}

  ngOnInit(): void {
    this.trackTimeForm = this.formBuilder.group({
      date: [''],
      timeHours: [''],
      timeMinutes: [''],
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
        console.log('clicked');
  }
}
