import { Component, EventEmitter, OnInit, Output, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AdminPortalService } from 'src/app/services/admin-portal/admin-portal.service';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-delete',
  templateUrl: './delete.component.html',
  styleUrls: ['./delete.component.css'],
})
export class DeleteComponent implements OnInit {
  deleteTimeTrack: boolean = false;
  deleteUser: boolean = false;
  childDeletePopup: boolean = false;
  @Input() getUserId: number = 0;
  @Output() popupVal = new EventEmitter<boolean>();

  constructor(
    private adminportalservice: AdminPortalService,
    private activatedroute: ActivatedRoute,
    private userservice: UserService
  ) {}

  ngOnInit(): void {
    if (this.activatedroute.snapshot.params['userId'] || localStorage.getItem('loggedInUser')) {
      this.deleteTimeTrack = true;
    }
    else{
      this.deleteUser = true;
    }
  }

  // confirm delete user functionality
  confirmDeleteUser(getUserId: number) {
    this.adminportalservice.deleteUser(getUserId);
    this.popupVal.emit(this.childDeletePopup);
  }
  // confirm delete time functionality
  confirmDeleteTime(getUserId: number) {
    this.userservice.deleteUser(getUserId);
    this.popupVal.emit(this.childDeletePopup);
  }

  // cancel delete functionality
  cancelDeletePopup() {
    this.popupVal.emit(this.childDeletePopup);
  }
}
