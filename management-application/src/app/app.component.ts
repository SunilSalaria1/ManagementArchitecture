import { Component, HostListener } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonService } from './services/common/common';
import { UserService } from './services/user/user.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'management-application';
  // loader
  loader: boolean = true;
  // change margin of main
  mainMargin: boolean = false;
  // show and hide aside, header
  asideHeader: boolean = this.commonservice.asideHeader;
  // show and hide aside, header
  // aside: boolean = this.commonservice.asideHeader;
  noData: boolean = false;
  constructor(
    private commonservice: CommonService,
    private route: Router,
    private activatedroute: ActivatedRoute
  ) {}

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    window.onbeforeunload = function () {
      alert('going to clear');
      // localStorage.clear();
      return '';
    };
  }

  ngDoCheck(): void {
    this.mainMargin = this.commonservice.aside;
    this.asideHeader = this.commonservice.asideHeader;
    console.log(this.activatedroute);

    // this.activatedroute.data.subscribe((data) => console.log(data));
    if (
      localStorage.getItem('loggedInUser') === null &&
      localStorage.getItem('loggedInAdmin') === null
    ) {
      this.noData = true;
    }
  }
  ngOnInit(): void {
    if (this.noData === true) {
      this.route.navigateByUrl('/login');
    }
    console.log('init worked');

    setTimeout(() => {
      this.loader = false;
    }, 1000);
    if (localStorage.getItem('loggedInUser')) {
      this.commonservice.authentication = true;
      this.commonservice.aside = true;
      this.commonservice.asideHeader = true;
      this.commonservice.dashboard = true;
    }
    if (localStorage.getItem('loggedInAdmin')) {
      this.commonservice.authentication = true;
      this.commonservice.aside = true;
      this.commonservice.asideHeader = true;
      this.commonservice.adminPortal = true;
    }
  }
}
