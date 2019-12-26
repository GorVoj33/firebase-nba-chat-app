import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  state: string = '';
  error: any;
  dataLoading: boolean = false;
  brokenNetwork = false;
  savedChanges = false;
  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {
  }
  routeChatPage (){
    this.router.navigate(['/chat']);
  }
  
  onSubmit(formData) {
    this.dataLoading = true;
    var f_name = formData.value.first_name;
    var l_name = formData.value.last_name;
    var email = formData.value.email;
    var password = formData.value.password;
    this.authService.signup(f_name,l_name,email,password).subscribe(
      (success) =>
      {
        this.dataLoading = false;
        this.savedChanges = true;
        this.routeChatPage();
      },
        (error) => {
          this.error = error;
          this.dataLoading = false;
          this.savedChanges = false;
        }
      )
  }

}
