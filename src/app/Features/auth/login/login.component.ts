import { Component } from '@angular/core';
import { LoginRequest } from '../models/login-request.model';
import { AuthService } from '../services/auth.service';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  
  model:LoginRequest;
  constructor(private authService:AuthService,private cookieService:CookieService){
    this.model={
      email:'',
      password:''
    };
  }
  onformSubmit():void{
    //console.log(this.model);
    this.authService.login(this.model).subscribe({
      next:(response)=>{
        //console.log(response);
        //set auth cookie 
        this.cookieService.set('Authorization',`Bearer ${response.token}`,undefined,'/',undefined,true,'Strict');
        console.log('Login successful, token stored in cookies.');
      },
      error:(error)=>{
        console.log(error);
      }
    });
  }
}
