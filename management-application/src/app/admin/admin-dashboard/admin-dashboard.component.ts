import { Component, OnInit, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
import { AdminPortalService } from 'src/app/services/admin-portal/admin-portal.service';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css'],
})
export class AdminDashboardComponent implements OnInit {
  constructor(
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
    this.renderData();
    this.successConfirm = this.adminportalservice.successAlert;
    console.log(this.successConfirm);
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
    console.log(this.successConfirm);
    this.adminportalservice.successAlert = false;
    this.route.navigate(['/edit-user', userId]);
    console.log(this.successConfirm);
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
