import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class AdminPortalService {
  deleteItem(deleteItem: number) {
    throw new Error('Method not implemented.');
  }
  url = 'http://localhost:3000/user';
  tableData:any = [];
  constructor(private http: HttpClient) {}

  // display the table data
  renderData() {
    return this.http.get<any>(this.url);
  }

  get(){
    return this.http.get<any>(this.url);
  }

// render single user data
renderUserData(userId: number){
  return this.http.get<any>(`${this.url}/${userId}`);
}

  // delete the user from the table
  deleteUser(user: number){
    this.http.delete(`${this.url}/${user}`).subscribe();
  }
  
}
