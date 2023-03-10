import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CommonService {
  // user details id
  userDettailsId:number = 0;
  // aside toggle
  aside: boolean = true;
  // aside and header
  asideHeader: boolean = false;
  // authentication guard
  authentication: boolean = false;
  // dashboard aside
  dashboard: boolean = false;
  // admin-portal aside
  adminPortal: boolean = false;
  // recent tracking hours
  recentTrackTime: any = 0;
  constructor() {}
  ngOnInit(): void {
    if (this.authentication === true) {
      this.aside = true;
      this.asideHeader = true;
    }
  }
}
