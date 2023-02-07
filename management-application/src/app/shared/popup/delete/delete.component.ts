import { Component, EventEmitter, OnInit, Output, Input } from '@angular/core';
import { AdminPortalService } from 'src/app/services/admin-portal/admin-portal.service';

@Component({
  selector: 'app-delete',
  templateUrl: './delete.component.html',
  styleUrls: ['./delete.component.css'],
})
export class DeleteComponent implements OnInit {
  childDeletePopup: boolean = false;
  @Input() getUserId: number = 0;
  @Output() popupVal = new EventEmitter<boolean>();

  constructor(private adminportalservice: AdminPortalService) {}
  
  ngOnInit(): void {}

  // confirm delete functionality
  confirmDelete(getUserId: number) {
    this.adminportalservice.deleteUser(getUserId);
    this.popupVal.emit(this.childDeletePopup);
  }

  // cancel delete functionality
  cancelDeletePopup() {
    this.popupVal.emit(this.childDeletePopup);
  }
}
