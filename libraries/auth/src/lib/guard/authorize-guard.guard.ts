import { Injectable } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

//working
// let activate = false;

// export const authorizeGuardGuard = (): boolean => {
//   let router = new Router();

//   if (activate) {
//           console.log('true');
//           return true;
//         } 
//         else {
//           console.log('false');
//           router?.navigate(['login']);
//           return false;
//         }
 
//  };


@Injectable({ providedIn: 'root' })
export class authorizeGuardGuard {
  constructor(
    public router: Router
  ) {}
  activate = false;
  canActivate(): boolean {
    if (this.activate) {
      return true;
    } else {
      // this.router.navigate(['login']);
      return false;
    }
  } 
}
  