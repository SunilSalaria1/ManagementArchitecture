import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonService } from 'src/app/services/common/common';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  url = 'http://localhost:3000/user';
  userId: number = this.commonservice.loggedId;
  constructor(private commonservice: CommonService, private http: HttpClient) {}

  getLoggedUserData() {
    this.userId = this.commonservice.loggedId;
    return this.http.get<any>(`${this.url}/${this.userId}`);
  }
}
