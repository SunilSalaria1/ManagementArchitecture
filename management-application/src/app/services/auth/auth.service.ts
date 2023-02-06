import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  url = 'http://localhost:3000/user';
  constructor(private http: HttpClient) {}
  // post register data
  registerUser(resultArr: any) {
    return this.http.post('http://localhost:3000/user', resultArr);
  }

  // get and compare the login data
  loginUser(): any {
    return this.http.get<any>(this.url);
  }
}
