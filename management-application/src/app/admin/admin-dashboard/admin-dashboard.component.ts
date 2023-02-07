import { Component, OnInit } from '@angular/core';
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
  successConfirm: boolean = false;

  // pass id to confirm delete functionality
  deleteItem: number = 0;

  ngOnInit(): void {
    this.renderData();
    console.log(this.deletePopup);
  }

  // render data into table
  renderData() {
    this.adminportalservice.renderData().subscribe((data) => {
      this.tableData = data;
      console.log(this.tableData);
    });
  }
  
  // show delete popup
  showDeletePopup(ProductId: any) {
    this.deleteItem = ProductId;
    this.deletePopup = true;
    console.log(this.deletePopup);
  }

  // close success confirmation popup
  closeConfirmation() {
    this.successConfirm = false;
  }
  // view user details
  viewUserDetails(userId: number) {
    this.route.navigate(['/user-details', userId]);
  }

  // recieve value
  recieveData(event: any) {
    this.deletePopup = event;
    this.renderData();
  }
}
