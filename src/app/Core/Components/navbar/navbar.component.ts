import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/Features/auth/models/user.model';
import { AuthService } from 'src/app/Features/auth/services/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

 user? : User;
  constructor(private authservice:AuthService,private router: Router){  
    
    
  }
  ngOnInit(): void {
    this.authservice.user().subscribe({
      next: (resp:any)=>{
        this.user=resp;
        
        console.log(resp,'response');
      }
    });

    this.user = this.authservice.getUser();
    console.log(this.user,'initial user');
  }


onLogout():void{
  this.authservice.logout();
  this.router.navigateByUrl('/');
}
}
