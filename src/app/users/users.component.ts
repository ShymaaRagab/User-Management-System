import { Component, OnInit} from '@angular/core';
import { UsersService } from '../users.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrl: './users.component.css'
})
export class UsersComponent implements OnInit{
  userData: any[] = [];

  constructor(private userservice: UsersService) { }

  ngOnInit(): void {
    this.userservice.getUsers().subscribe(
      {
        next: (res) => this.userData = res.users
      }
    );
  }

  sortbyName() {
    //this.userData.sort((a, b) => a.firstName.localeCompare(b.firstName));


    //another solution
    this.userData.sort(
      (a, b) => {
        if(a.firstName > b.firstName) return 1;
        else if (a.firstName < b.firstName) return -1;
        else return 0
      }
    )
  }

  sortByAge(): void {
    // this.userData.sort((a, b) => a.age - b.age);

    //another solution
    this.userData.sort(
      (a,b)=>{
        if (a.age > b.age) return 1;
        if (a.age < b.age) return -1;
        return 0;
      }
    );

  }

}
