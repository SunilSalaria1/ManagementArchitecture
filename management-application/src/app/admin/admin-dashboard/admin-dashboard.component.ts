import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AdminPortalService } from 'src/app/services/admin-portal/admin-portal.service';
import { CommonService } from 'src/app/services/common/common';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css'],
})
export class AdminDashboardComponent implements OnInit {
  // password type
  passwordType: string = 'password';
  constructor(
    private commonservice: CommonService,
    private adminportalservice: AdminPortalService,
    private route: Router
  ) {}

  tableData: any = [];

  // delete popup
  deletePopup: boolean = false;

  // confirm popup
  successConfirm: boolean = this.adminportalservice.successAlert;

  // pass id to confirm delete functionality
  deleteItem: number = 0;

  ngOnInit(): void {
    this.commonservice.aside = true;
    this.commonservice.asideHeader = true;
    this.commonservice.dashboard = false;
    if (localStorage.getItem('loggedInUser') == 'true') {
      this.route.navigateByUrl('/page-not-found');
      this.commonservice.aside = false;
      this.commonservice.asideHeader = false;
      this.commonservice.dashboard = false;
    }
    this.renderData();
    this.successConfirm = this.adminportalservice.successAlert;
  }
  // render data into table
  renderData() {
    this.adminportalservice.renderData().subscribe((data) => {
      this.tableData = data;
    });
  }

  // show delete popup
  showDeletePopup(ProductId: any) {
    this.deleteItem = ProductId;
    this.deletePopup = true;
  }

  // close success confirmation popup
  closeConfirmation() {
    this.successConfirm = false;
  }

  // view user details
  viewUserDetails(userId: number) {
    this.route.navigate(['/user-details', userId]);
  }

  // edit user details
  editUserDetails(userId: number) {
    this.successConfirm = false;
    this.adminportalservice.successAlert = false;
    this.route.navigate(['/edit-user', userId]);
  }
  // recieve value
  recieveData(event: any) {
    this.deletePopup = event;
    this.renderData();
  }

  // destroy
  ngOnDestroy(): void {
    this.adminportalservice.successAlert = false;
  }
}
