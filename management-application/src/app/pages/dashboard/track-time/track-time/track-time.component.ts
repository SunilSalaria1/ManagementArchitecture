import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup} from '@angular/forms';


@Component({
  selector: 'app-track-time',
  templateUrl: './track-time.component.html',
  styleUrls: ['./track-time.component.css']
})
export class TrackTimeComponent implements OnInit {
  // tracktime form
  trackTimeForm!: FormGroup;
  constructor() { }

  ngOnInit(): void {
  }

}
