import { Injectable } from '@angular/core';
import { CommonService } from 'src/app/services/common/common';

import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private commonservice: CommonService, private route: Router) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    if (this.commonservice.authentication===true) {
      return true;
    }
    if (this.commonservice.authentication === false) {
      this.route.navigateByUrl('/login');
    }
    return this.commonservice.authentication;
  }
  // return this.commonservice.authentication;
}
