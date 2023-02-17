import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AdminPortalService } from 'src/app/services/admin-portal/admin-portal.service';
import { CommonService } from 'src/app/services/common/common';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  // sample
  // curr = new Date(); // get current date

  // curdate = new Date().toISOString().slice(5, 7);
  // currentDateee = new Date().toISOString().slice(5, 7);
  // current date
  currentDate = new Date().toISOString().substring(0, 10);
  // today hours
  hoursToday: any = 0;
  // current user details
  currentUserName: string = '';
  currentUserProfession: string = '';
  // table data
  trackTableData: any = [];
  // current user Id
  loggedInId: any = localStorage.getItem('loggedInId');
  // recent track time added
  recentTrackTime: any = this.commonservice.recentTrackTime;
  constructor(
    private commonservice: CommonService,
    private route: Router,
    private userservice: UserService
  ) {}
  ngOnInit(): void {
    // console.log(this.curdate);
    // let first = this.curr.getDate() - this.curr.getDay(); // First day is the day of the month - the day of the week
    // let last = first + 6; // last day is the first day + 6
    // let firstDay = new Date(this.curr.setDate(first))
    //   .toISOString()
    //   .substring(0, 10);
    // let lastDay = new Date(this.curr.setDate(last))
    //   .toISOString()
    //   .substring(0, 10);
    // this.userservice.getData().subscribe((data) => {
    //   console.log(data[0].date.slice(5, 7));
    //   debugger;
    //   data.forEach((item: any) => {
    //     if (item.date.slice(5, 7) == this.curdate) {
    //       for (let day: number = first; day <= last; day++) {
    //         debugger;
    //         let x = item.date.slice(8, 11);
    //         if (x == day) {
    //           console.log(item.timeHours);
    //         }
    //       }
    //     }
    //   });
    // });

    this.userservice.getLoggedUserData().subscribe((data) => {
      this.currentUserName = data.firstName;
      this.currentUserProfession = data.profession;
    });
    this.commonservice.aside = true;
    this.commonservice.asideHeader = true;
    console.log(this.recentTrackTime);
    this.userservice.getData().subscribe((data) => {
      let UserTrackData = data.filter((data: any) => {
        return data.currentUserId == this.loggedInId;
      });
      let currentDateHours = UserTrackData.filter((data: any) => {
        return data.date == this.currentDate;
      });
      console.log(
        currentDateHours[0].timeHours,
        currentDateHours[0].timeMinutes
      );
      this.hoursToday = `${currentDateHours[0].timeHours}:${currentDateHours[0].timeMinutes}`;

      console.log(UserTrackData);
      this.trackTableData = UserTrackData;
    });
    if (localStorage.getItem('loggedInAdmin') == 'true') {
      this.route.navigateByUrl('/page-not-found');
      this.commonservice.aside = false;
      this.commonservice.asideHeader = false;
      this.commonservice.adminPortal = false;
    }
  }
  firstDay(firstDay: any, lastDay: any) {
    throw new Error('Method not implemented.');
  }
  lastDay(firstDay: any, lastDay: any) {
    throw new Error('Method not implemented.');
  }
  get sortData() {
    return this.trackTableData.sort((a: any, b: any) => {
      return <any>new Date(b.date) - <any>new Date(a.date);
    });
  }
}
//   get sortData() {
//     return .sort((a: any, b: any) => {
//       return <any>new Date(b.date) - <any>new Date(a.date);
//     });
// }}
// this.commonservice.recentTrackTime = `${this.trackTimeForm.value.timeHours}:${this.trackTimeForm.value.timeMinutes}`;
