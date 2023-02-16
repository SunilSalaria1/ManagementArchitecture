import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CommonService {
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
  // logged in user ID
  loggedId: number = 1;
  constructor() {}
  ngOnInit(): void {
    if (this.authentication === true) {
      this.aside = true;
      this.asideHeader = true;
    }
  }
}
