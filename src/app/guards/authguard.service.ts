import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { User } from '../classes/user.interface.model';


@Injectable({
  providedIn: 'root'
})
export class AuthguardService implements CanActivate {

  constructor(public auth: AuthService, public router: Router) {}
  canActivate(): boolean {
    var user = this.auth.currentUserSnapshot;
    if (!user) {
      this.router.navigate(['login']);
      return false;
    }
    return true;
  }
}
