import { Component, OnInit } from '@angular/core';
import { CommonService } from 'src/app/services/common/common';

@Component({
  selector: 'app-page-not-found',
  templateUrl: './page-not-found.component.html',
  styleUrls: ['./page-not-found.component.css'],
})
export class PageNotFoundComponent implements OnInit {
  constructor(private commonservice: CommonService) {}

  ngOnInit(): void {
    this.commonservice.asideHeader = false;
    this.commonservice.aside = false;
  }
}
