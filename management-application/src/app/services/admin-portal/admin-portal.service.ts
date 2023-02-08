import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AdminPortalService {
  successAlert: boolean = false;
  url = 'http://localhost:3000/user';
  tableData: any = [];
  constructor(private http: HttpClient, private route: Router) {}

  // display the table data
  renderData() {
    return this.http.get<any>(this.url);
  }

  // render single user data
  renderUserData(userId: number) {
    return this.http.get<any>(`${this.url}/${userId}`);
  }

  // delete the user from the table
  deleteUser(user: number) {
    this.http.delete(`${this.url}/${user}`).subscribe();
  }
  // edit user details
  editUser(user: number, value: any) {
    return this.http.put(`${this.url}/${user}`, value);
  }
}
