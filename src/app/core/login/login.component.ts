import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  socialAuth : boolean = true;
  username: string = '';
  token : Promise<string>;
  constructor(public afAuth : AngularFireAuth, private authService: AuthService, private router: Router) { }

  ngOnInit() {
    this.afAuth.user.subscribe(
      user => {
        if(user) this.username = user.email;
      }
    )
    // this.authService.currentUser.subscribe( user => {
    //   if(user) {
    //     this.username = user.firstName+ ' '+user.lastName;
    //   }
    // });
    // this.afAuth.user.subscribe(
    //   user => {
    //     // console.log('token ',this.token)
    //     if(user)
    //       this.username = user.displayName;
    //   }
    // )
  }
  login(type, formData?){
    if(type === 'REGULAR'){
      this.authService.loginRegular(formData.email, formData.password);
      this.router.navigate(['/chat']);
      //this.loadUserInfo();
      
    }
    if(type === 'GOOGLE'){
       this.authService.loginGoogle();
    }
    if(type==='FACEBOOK'){
      this.authService.loginFacebook();
    }
  }
  logout(){
    this.authService.logout();
    
  }
}