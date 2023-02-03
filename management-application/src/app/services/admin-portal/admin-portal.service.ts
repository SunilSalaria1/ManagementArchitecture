import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class AdminPortalService {
  url = 'http://localhost:3000/user';
  constructor(private http: HttpClient) {}
  renderData() {
    return this.http.get<any>(this.url).subscribe(function (data) {
      console.log(data);
    });
  }
}
