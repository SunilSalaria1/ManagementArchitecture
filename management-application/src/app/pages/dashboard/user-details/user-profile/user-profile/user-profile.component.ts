import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css'],
})
export class UserProfileComponent implements OnInit {
  loggedUserData: any = {};
  constructor(private userservice: UserService) {}
  ngOnInit() {
    this.userservice.getLoggedUserData().subscribe((response) => {
      this.loggedUserData = response;
    });
  }
}

