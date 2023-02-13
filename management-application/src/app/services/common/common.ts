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
  authentication:boolean = false;
  constructor() {}
}
