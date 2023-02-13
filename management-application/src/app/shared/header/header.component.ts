import { Component, OnInit } from '@angular/core';
import { CommonService } from 'src/app/services/common/common';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  // show and hide aside, header
  asideHeader: boolean = this.commonservice.asideHeader;
  constructor(private commonservice: CommonService) {}

  ngOnInit(): void {}

  ngDoCheck(): void {
    this.asideHeader = this.commonservice.asideHeader;
  }

  // toggle function
  asideToggle() {
    console.log('toggled');
    this.commonservice.aside = !this.commonservice.aside;
  }
}
