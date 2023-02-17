import { Component, OnInit } from '@angular/core';
import { CommonService } from 'src/app/services/common/common';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css'],
})
export class UserProfileComponent implements OnInit {
  loggedUserData: any = {};
  constructor(
    private userservice: UserService,
    private commonservice: CommonService
  ) {}
  ngOnInit() {
    this.userservice.getLoggedUserData().subscribe((response) => {
      this.loggedUserData = response;
    });
  }
}
