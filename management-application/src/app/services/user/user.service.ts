import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonService } from 'src/app/services/common/common';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  url = 'http://localhost:3000/user';
  userId: any = localStorage.getItem('loggedInId');
  constructor(private commonservice: CommonService, private http: HttpClient) {}
  // get logged user data
  getLoggedUserData() {
    return this.http.get<any>(`${this.url}/${this.userId}`);
  }
  // post the track time data
  postTrackTime(resultArr: any) {
    return this.http.post('http://localhost:3000/userTrackTime', resultArr);
  }
  getData() {
    return this.http.get<any>('http://localhost:3000/userTrackTime');
  }
}
