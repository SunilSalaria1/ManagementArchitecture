import { Component, OnInit } from '@angular/core';
import { AdminPortalService } from 'src/app/services/admin-portal/admin-portal.service';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css'],
})
export class AdminDashboardComponent implements OnInit {
  constructor(private adminportalservice: AdminPortalService) {}
  tableData: any = [];
  // delete popup
  deletePopup: boolean = false;
  // confirm popup
  successConfirm: boolean = false;
  // pass id to confirm delete functionality
  deleteItem: number = 0;

  ngOnInit(): void {
    this.renderData();
  }

  // render data into table
  renderData() {
    this.adminportalservice.renderData().subscribe((data) => {
      this.tableData = data;
      console.log(this.tableData);
    });
  }

  // delete confirmation
  confirmDelete(deleteItem: number) {
    this.adminportalservice.deleteUser(deleteItem);
    this.deletePopup = false;
    this.successConfirm = true;
    this.renderData();
  }

  // show delete popup
  showDeletePopup(ProductId: any) {
    this.deleteItem = ProductId;
    this.deletePopup = true;
  }

  // cancel delete popup
  cancelDeletePopup() {
    this.deletePopup = false;
  }
  
  // close success confirmation popup
  closeConfirmation(){
    this.successConfirm = false;
  }
}
