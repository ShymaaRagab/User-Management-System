import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  constructor(private router:Router , private auth:AuthService){}

  isLog :boolean = false;

  ngOnInit(): void {
    this.isLog = this.auth.isLogin();
    console.log(this.isLog)
  }

  navigateRouter(r:string){
    this.router.navigate([r]);
  }

  logOut(){
    this.auth.logOut();
  }

}
