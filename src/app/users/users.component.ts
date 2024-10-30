import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { UsersService } from '../users.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrl: './users.component.css'
})
export class UsersComponent implements OnInit, OnChanges{
  userData :any[]=[];

  constructor(private userservice:UsersService){}

  ngOnInit(): void {
    this.userservice.getUsers().subscribe(
      {
        next:(res)=> this.userData = res.users
      }
    );
  }

  ngOnChanges(): void {
    this.userData;
  }
  sortbyName(){
    this.userData.sort((a, b) => {
      if (a.firstname < b.firstname) return -1;
      if (a.firstname > b.firstname) return 1;
      return 0;
    });
    console.log(this.userData)
    return this.userData;
  }

}
