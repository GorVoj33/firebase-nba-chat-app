import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { User } from 'src/app/classes/user.interface.model';
import { UserClass } from 'src/app/classes/user.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
 constructor(private auth: AuthService, private router:Router) { }
  user : User;
  ngOnInit() {
    this.auth.currentUser.subscribe(
      userResponse => {
        this.user = userResponse;
      }
    )
  }
  logout(){
    this.auth.logout();
  }
}
