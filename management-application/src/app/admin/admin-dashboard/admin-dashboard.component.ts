import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AdminPortalService } from 'src/app/services/admin-portal/admin-portal.service';
import { CommonService } from 'src/app/services/common/common';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css'],
})
export class AdminDashboardComponent implements OnInit {
  // selectedEntries
  selectedEntry: any = 5;
  // pagination
  itemsPerPage: number = 5;
  currentPage: number = 1;
  // not found text
  notFound: boolean = false;
  // search text
  searchText: string = '';
  // password type
  passwordType: string = 'password';
  constructor(
    private commonservice: CommonService,
    private adminportalservice: AdminPortalService,
    private route: Router
  ) {}

  tableData: any = [];
  filterTable: any = this.tableData;
  // delete popup
  deletePopup: boolean = false;

  // confirm popup
  successConfirm: boolean = this.adminportalservice.successAlert;

  // pass id to confirm delete functionality
  deleteItem: number = 0;
  // render data into table
  renderData() {
    this.adminportalservice.renderData().subscribe((data) => {
      this.tableData = data;
    });
  }

  ngOnInit(): void {
    this.commonservice.aside = true;
    this.commonservice.asideHeader = true;
    this.commonservice.dashboard = false;
    this.notFound = false;
    if (localStorage.getItem('loggedInUser') == 'true') {
      this.route.navigateByUrl('/page-not-found');
      this.commonservice.aside = false;
      this.commonservice.asideHeader = false;
      this.commonservice.dashboard = false;
    }
    this.renderData();
    this.successConfirm = this.adminportalservice.successAlert;
  }

  entrychange(event: any) {
    this.itemsPerPage = this.selectedEntry;
    this.currentPage = 1;
  }

  ngDoCheck(): void {
    
    let filteredData = this.tableData.filter((data: any) => {
      return (
        data.firstName.toLocaleLowerCase().includes(this.searchText) ||
        data.lastName.toLocaleLowerCase().includes(this.searchText) ||
        data.email.toLocaleLowerCase().includes(this.searchText) ||
        data.profession.toLocaleLowerCase().includes(this.searchText)
      );
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
    this.route.navigate(['/admin-portal/user-details', userId]);
  }

  // edit user details
  editUserDetails(userId: number) {
    this.successConfirm = false;
    this.adminportalservice.successAlert = false;
    this.route.navigate(['admin-portal/edit-user', userId]);
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
