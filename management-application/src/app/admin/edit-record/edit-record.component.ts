import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AdminPortalService } from 'src/app/services/admin-portal/admin-portal.service';

@Component({
  selector: 'app-edit-record',
  templateUrl: './edit-record.component.html',
  styleUrls: ['./edit-record.component.css'],
})
export class EditRecordComponent implements OnInit {
  static demofun() {
    throw new Error('Method not implemented.');
  }
  showSuccessAlert: boolean = false;
  editUserId: number = 0;
  tableData: any = [];
  constructor(
    private adminportalservice: AdminPortalService,
    private activatedroute: ActivatedRoute,
    private route: Router
  ) {}

  ngOnInit(): void {
    let userId = this.activatedroute.snapshot.params['userId'];
    this.adminportalservice.renderUserData(userId).subscribe((data) => {
      this.tableData = data;
      this.editUserId = data.id;
    });
  }

  // update user details
  updateUser(userData: any) {
    this.adminportalservice
      .editUser(this.editUserId, userData)
      .subscribe((data: any) => {
        if (data) {
          this.route.navigate(['/admin-portal']);
          this.adminportalservice.successAlert = true;
        }
      });
  }
  // cancel edit
  cancelEdit() {
    this.route.navigate(['/admin-portal']);
    this.adminportalservice.successAlert = false;
  }
}
