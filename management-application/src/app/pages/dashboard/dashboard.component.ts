import { Component, OnInit, SimpleChanges } from '@angular/core';
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
  // performance progress indicator
  percentage: number = 50;
  x = (180 * this.percentage) / 100;
  // current date
  currentDate = new Date().toISOString().substring(0, 10);
  dateCurrent = new Date();
  // today hours
  hoursToday: any = 0;
  // hours current week
  hoursCurrentWeek: any = 0;
  // hours current month
  hoursCurrentMonth: any = 0;
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
    // month
    let currentMonth = this.dateCurrent.getMonth() + 1;
    let firstDate = this.dateCurrent.getDate() - this.dateCurrent.getDay();
    let lastDate = firstDate + 6;
    // track time
    let totalHoursCurrentWeek = 0;
    let totalMinutesCurrentWeek = 0;
    let totalHoursCurrentMonth = 0;
    let totalMinutesCurrentMonth = 0;

    this.userservice.getData().subscribe((data) => {
      data.forEach((item: any) => {
        // calculate hours of current week
        let convertTimeHours;
        let convertTimeMinutes;
        if (item.dateOnly >= firstDate && item.dateOnly <= lastDate) {
          convertTimeHours = parseInt(item.timeHours);
          totalHoursCurrentWeek += convertTimeHours;
          // minutes
          convertTimeMinutes = parseInt(item.timeMinutes);
          totalMinutesCurrentWeek += convertTimeMinutes;

          if (totalMinutesCurrentWeek >= 60) {
            let calculatedHours = Math.floor(totalMinutesCurrentWeek / 60);
            totalHoursCurrentWeek = totalHoursCurrentWeek + calculatedHours;
            console.log('hours are ' + totalHoursCurrentWeek);
            totalMinutesCurrentWeek = totalMinutesCurrentWeek % 60;

            console.log('Minutes are ' + totalMinutesCurrentWeek);

            let totalTimeCurrentWeek = `${totalHoursCurrentWeek}.${totalMinutesCurrentWeek}`;
            this.hoursCurrentWeek = totalTimeCurrentWeek;
          }
          if (totalMinutesCurrentWeek < 60) {
            let totalTimeCurrentWeek = `${totalHoursCurrentWeek}.${totalMinutesCurrentWeek}`;
            this.hoursCurrentWeek = totalTimeCurrentWeek;
          }
        }
        // calculate hours of current month
        let convertTimeMonth;
        if ((item.dateOnly = currentMonth)) {
          convertTimeMonth = parseInt(item.timeHours);
          totalHoursCurrentMonth += convertTimeMonth;
          // minutes
          convertTimeMinutes = parseInt(item.timeMinutes);
          totalMinutesCurrentMonth += convertTimeMinutes;
          if (totalMinutesCurrentMonth >= 60) {
            let calculatedHours = Math.floor(totalMinutesCurrentMonth / 60);
            totalHoursCurrentMonth = totalHoursCurrentMonth + calculatedHours;
            console.log('hours are ' + totalHoursCurrentMonth);
            totalMinutesCurrentMonth = totalMinutesCurrentMonth % 60;
            console.log('Minutes are ' + totalMinutesCurrentMonth);
            let totalTimeCurrentMonth = `${totalHoursCurrentMonth}.${totalMinutesCurrentMonth}`;
            this.hoursCurrentMonth = totalTimeCurrentMonth;
          }
          if (totalMinutesCurrentMonth < 60) {
            let totalTimeCurrentMonth = `${totalHoursCurrentMonth}.${totalMinutesCurrentMonth}`;
            this.hoursCurrentMonth = totalTimeCurrentMonth;
          }
        }
      });
    });
    this.userservice.getLoggedUserData().subscribe((data) => {
      this.currentUserName = data.firstName;
      this.currentUserProfession = data.profession;
    });
    this.commonservice.aside = true;
    this.commonservice.asideHeader = true;
    this.userservice.getData().subscribe((data) => {
      let UserTrackData = data.filter((data: any) => {
        return data.currentUserId == this.loggedInId;
      });
      let currentDateHours = UserTrackData.filter((data: any) => {
        return data.date == this.currentDate;
      });
      this.hoursToday = `${currentDateHours[0].timeHours}.${currentDateHours[0].timeMinutes}`;
      this.trackTableData = UserTrackData;
      console.log(this.hoursToday);
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
