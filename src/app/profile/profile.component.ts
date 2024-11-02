import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { getActiveConsumer } from '@angular/core/primitives/signals';

export interface UserData {
  id: number;
  firstName: string;
  lastName: string;
  age: number;
  gender: string;
  image: string;
  company: {
    department: string;
    title: string;
  };
  role: string;
}

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent implements OnInit {
  constructor(private auth: AuthService , private router: Router){}
  userToken = localStorage.getItem('userToken') || '';

  userData: UserData = {
    id: 0,
    firstName: '',
    lastName: '',
    age: 0,
    gender: '',
    image: '',
    company: {
      department: '',
      title: '',
    },
    role: ''
  };
  ngOnInit(): void {
    this.getuser();
  }


  checkRole(){
    if(this.userData.role == 'admin'){
      this.router.navigate(['/users']);
    }
  }

  logOut(){
    this.auth.logOut();
  }

  getuser(){
      if (this.userToken) {
        this.auth.LoginAuth(this.userToken).subscribe({
          next: (res) => {
            this.userData = res;
            console.log(res);
          },
          error: (err) => {
            console.error('Error fetching user data:', err);
          },
        });
      } else {
        console.error('No access token found.');
      }
      
  }

}
