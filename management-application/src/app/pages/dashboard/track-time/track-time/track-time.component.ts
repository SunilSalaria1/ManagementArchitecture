import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-track-time',
  templateUrl: './track-time.component.html',
  styleUrls: ['./track-time.component.css'],
})
export class TrackTimeComponent implements OnInit {
  // tracktime form
  trackTimeForm!: FormGroup;
  constructor(private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.trackTimeForm = this.formBuilder.group({
      date: [''],
      timeHours: [''],
      timeMinutes: [''],
      project: [''],
      task: [''],
      description: [''],
    });
  }
  trackTimeClick() {
        console.log('clicked');
  }
}
