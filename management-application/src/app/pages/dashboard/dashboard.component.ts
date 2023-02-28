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
  // selectedEntries
  selectedEntry: any = 5;
  // pagination
  itemsPerPage: number = 5;
  currentPage: number = 1;
  // not found text
  notFound: boolean = false;
  // search text
  searchText: string = '';
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
  filterTable: any = this.trackTableData;

  // current user Id
  loggedInId: any = localStorage.getItem('loggedInId');
  // recent track time added
  recentTrackTime: any = this.commonservice.recentTrackTime;
  constructor(
    private commonservice: CommonService,
    private route: Router,
    private userservice: UserService
  ) {}
  renderFullDetail() {
    this.userservice.getLoggedUserData().subscribe((data) => {
      this.currentUserName = data.firstName;
      this.currentUserProfession = data.profession;
    });
    this.userservice.getData().subscribe((data) => {
      let UserTrackData = data.filter((data: any) => {
        return data.currentUserId == this.loggedInId;
      });
      let currentDateHours = UserTrackData.filter((data: any) => {
        return data.date == this.currentDate;
      });
      this.trackTableData = UserTrackData;

      this.hoursToday = `${currentDateHours[0].timeHours}.${currentDateHours[0].timeMinutes}`;
      this.commonservice.aside = true;
      this.commonservice.asideHeader = true;

      if (localStorage.getItem('loggedInAdmin') == 'true') {
        this.route.navigateByUrl('/page-not-found');
        this.commonservice.aside = false;
        this.commonservice.asideHeader = false;
        this.commonservice.adminPortal = false;
      }
    });
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
      // total month hours according to the records
      this.totalMonthlyHours = data.filter(function (filteredData: any) {
        if (filteredData.monthOnly == currentMonth) {
          return true;
        }
        return false;
      }).length;
      this.totalMonthlyHours = this.totalMonthlyHours * 8;
      //monthly leave count
      this.leaveCount = data.filter((filteredData: any) => {
        if (
          filteredData.task === 'On Leave' &&
          filteredData.monthOnly == currentMonth &&
          filteredData.currentUserId === this.loggedInId
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
          item.currentUserId === this.loggedInId
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
        if (
          item.monthOnly == currentMonth &&
          item.currentUserId === this.loggedInId
        ) {
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
  }
  ngOnInit(): void {
    if (localStorage.getItem('loggedInUser') == 'true') {
      this.commonservice.aside = true;
      this.commonservice.asideHeader = true;
      this.commonservice.dashboard = true;
      this.commonservice.adminPortal = false;
    }
    this.renderFullDetail();
  }
  // ng do check
  ngDoCheck(): void {
    let filteredData = this.sortData.filter((data: any) => {
      return data.project.toLocaleLowerCase().includes(this.searchText);
    });
    if (filteredData) {
      this.notFound = false;
      console.log(filteredData.length);
      this.filterTable = filteredData;
    }
    if (filteredData.length < 1) {
      this.notFound = true;
    }
  }

  get sortData() {
    return this.trackTableData.sort((a: any, b: any) => {
      return <any>new Date(b.date) - <any>new Date(a.date);
    });
  }
  // edit track time
  editTime(trackUserId: number) {
    this.route.navigate(['/dashboard/edit-tracktime', trackUserId]);
  }
  // view time
  viewTime(trackUserId: number) {
    this.route.navigate(['/dashboard/view-tracktime', trackUserId]);
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
  // entry change
  entrychange(event: any) {
    this.itemsPerPage = this.selectedEntry;
    this.currentPage = 1;
  }
}
