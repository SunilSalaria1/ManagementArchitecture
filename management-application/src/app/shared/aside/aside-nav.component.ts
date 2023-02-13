import { Component, OnInit } from '@angular/core';
import { CommonService } from 'src/app/services/common/common';

@Component({
  selector: 'app-aside-nav',
  templateUrl: './aside-nav.component.html',
  styleUrls: ['./aside-nav.component.css'],
})
export class AsideNavComponent implements OnInit {
  aside: boolean = this.commonService.aside;
  // show and hide aside, header
  asideHeader: boolean = this.commonService.asideHeader;
  constructor(private commonService: CommonService) {}

  ngOnInit(): void {}
  ngDoCheck(): void {
    this.aside = this.commonService.aside;
    this.asideHeader = this.commonService.asideHeader;
  }
}
