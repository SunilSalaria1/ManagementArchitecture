import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { catchError } from 'rxjs';
import { AdminPortalService } from 'src/app/services/admin-portal/admin-portal.service';
import { CommonService } from 'src/app/services/common/common';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css'],
})
export class UserDetailsComponent implements OnInit {
  // delete popup
  deletePopup: boolean = false;
  // pass id to confirm delete functionality
  deleteItem: number = 0;
  // on Leave
  onLeave: boolean = false;
  // monthly leaves
  leaveCount: number = 0;
  // totalmonth hours
  totalMonthlyHours: number = 0;
  // overtime
  overtime: number = 0;
  // performance progress indicator
  percentage: any;
  x: any;
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
    private adminportalservice: AdminPortalService,
    private activatedroute: ActivatedRoute,
    private route: Router,
    private commonservice: CommonService,
    private userservice: UserService
  ) {}
  renderFullDetail() {
    console.log('running');

    let userId = this.activatedroute.snapshot.params['userId'];
    this.commonservice.userDettailsId = userId;
    // month
    let currentMonth = this.dateCurrent.getMonth() + 1;
    let firstDate = this.dateCurrent.getDate() - this.dateCurrent.getDay();
    let lastDate = firstDate + 6;
    // track time
    let totalHoursCurrentWeek = 0;
    let totalMinutesCurrentWeek = 0;
    let totalHoursCurrentMonth = 0;
    let totalMinutesCurrentMonth = 0;
    this.adminportalservice.renderUserData(userId).subscribe((data) => {
      this.currentUserName = data.firstName;
      this.currentUserProfession = data.profession;
    });
    this.userservice.getData().subscribe((data) => {
      // total month hours according to the records
      this.totalMonthlyHours = data.filter(function (filteredData: any) {
        if (filteredData.monthOnly == currentMonth) {
          return true;
        }
        return false;
      }).length;
      this.totalMonthlyHours = this.totalMonthlyHours * 8;
      //monthly leave count
      this.leaveCount = data.filter(function (filteredData: any) {
        if (
          filteredData.task === 'On Leave' &&
          filteredData.monthOnly == currentMonth &&
          filteredData.currentUserId === userId
        ) {
          return true;
        }
        return false;
      }).length;
      data.forEach((item: any) => {
        // leave status
        if (item.task === 'On Leave') {
          this.onLeave = true;
        }
        // calculate hours of current week
        let convertTimeHours;
        let convertTimeMinutes;
        if (
          item.dateOnly >= firstDate &&
          item.dateOnly <= lastDate &&
          item.currentUserId === userId
        ) {
          convertTimeHours = parseInt(item.timeHours);
          totalHoursCurrentWeek += convertTimeHours;
          // minutes
          convertTimeMinutes = parseInt(item.timeMinutes);
          totalMinutesCurrentWeek += convertTimeMinutes;

          if (totalMinutesCurrentWeek >= 60) {
            let calculatedHours = Math.floor(totalMinutesCurrentWeek / 60);
            totalHoursCurrentWeek = totalHoursCurrentWeek + calculatedHours;
            totalMinutesCurrentWeek = totalMinutesCurrentWeek % 60;
            let totalTimeCurrentWeek = `${totalHoursCurrentWeek}.${totalMinutesCurrentWeek}`;
            this.hoursCurrentWeek = totalTimeCurrentWeek;
          }
          if (totalMinutesCurrentWeek < 60) {
            if (totalMinutesCurrentWeek < 10) {
              let prependedNumber = '0' + totalMinutesCurrentWeek;
              let totalTimeCurrentWeek = `${totalHoursCurrentWeek}.${prependedNumber}`;
              this.hoursCurrentWeek = totalTimeCurrentWeek;
            }
            if (totalMinutesCurrentWeek > 9) {
              let totalTimeCurrentWeek = `${totalHoursCurrentWeek}.${totalMinutesCurrentWeek}`;
              this.hoursCurrentWeek = totalTimeCurrentWeek;
            }
          }
        }
        // calculate hours of current month
        let convertTimeMonth;
        if (item.monthOnly == currentMonth && item.currentUserId === userId) {
          convertTimeMonth = parseInt(item.timeHours);
          totalHoursCurrentMonth += convertTimeMonth;
          // minutes
          convertTimeMinutes = parseInt(item.timeMinutes);
          totalMinutesCurrentMonth += convertTimeMinutes;
          if (totalMinutesCurrentMonth >= 60) {
            let calculatedHours = Math.floor(totalMinutesCurrentMonth / 60);
            totalHoursCurrentMonth = totalHoursCurrentMonth + calculatedHours;
            totalMinutesCurrentMonth = totalMinutesCurrentMonth % 60;
            let totalTimeCurrentMonth = `${totalHoursCurrentMonth}.${totalMinutesCurrentMonth}`;
            this.hoursCurrentMonth = totalTimeCurrentMonth;
          }
          if (totalMinutesCurrentMonth < 60) {
            if (totalMinutesCurrentMonth < 10) {
              let prependedNumber = '0' + totalMinutesCurrentMonth;
              let totalTimeCurrentMonth = `${totalHoursCurrentMonth}.${prependedNumber}`;
              this.hoursCurrentMonth = totalTimeCurrentMonth;
            }
            if (totalMinutesCurrentMonth > 9) {
              let totalTimeCurrentMonth = `${totalHoursCurrentMonth}.${totalMinutesCurrentMonth}`;
              this.hoursCurrentMonth = totalTimeCurrentMonth;
            }
          }
          // overtime
          if (this.hoursCurrentMonth > this.totalMonthlyHours) {
            this.overtime = this.hoursCurrentMonth - this.totalMonthlyHours;
          }
          this.percentage =
            (this.hoursCurrentMonth / this.totalMonthlyHours) * 100;
          this.x = (180 * this.percentage) / 100;
          if (this.percentage > 100) {
            this.percentage = 100;
            this.x = 180;
          }
        }
      });
    });
    this.commonservice.aside = true;
    this.commonservice.asideHeader = true;
    this.userservice.getData().subscribe((data) => {
      let UserTrackData = data.filter((data: any) => {
        return data.currentUserId == userId;
      });
      let currentDateHours = UserTrackData.filter((data: any) => {
        return data.date == this.currentDate;
      });

      this.trackTableData = UserTrackData;
      this.hoursToday = `${currentDateHours[0].timeHours}.${currentDateHours[0].timeMinutes}`;
    });
  }
  ngOnInit() {
    this.renderFullDetail();
  }
  get sortData() {
    return this.trackTableData.sort((a: any, b: any) => {
      return <any>new Date(b.date) - <any>new Date(a.date);
    });
  }
  // edit track time
  editTime(trackUserId: number) {
    this.route.navigate(['/edit-tracktime', trackUserId]);
  }
  // view time
  viewTime(trackUserId: number) {
    this.route.navigate(['/view-tracktime', trackUserId]);
  }

  // show delete popup
  showDeletePopup(ProductId: any) {
    this.deleteItem = ProductId;
    this.deletePopup = true;
  }
  // recieve value
  recieveData(event: any) {
    this.deletePopup = event;
    this.renderFullDetail();
  }
}
