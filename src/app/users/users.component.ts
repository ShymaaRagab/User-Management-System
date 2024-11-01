import { Component, OnInit } from '@angular/core';
import { UsersService } from '../users.service';
import { Pagination } from '../pagination';


@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrl: './users.component.css'
})

export class UsersComponent implements OnInit {
  userData: any[] = [];
  limit: number = 26; // number of user that will show in table you can change it as you want
  current_page: number = 0; // i make this var to get the index of the paginationArray so i can know where we stop

  paginationArray: Pagination[] = [{
    page: 0,
    limit: this.limit,
    skip: 0
  }]
  total: number = 0;
  isSort: boolean = false;//{false => asc , true => desc}
  constructor(private userservice: UsersService) { }

  ngOnInit(): void {
    this.userservice.getTotal().subscribe({
      next: (res) => {
        this.total = res.total;
        console.log(this.total);
        this.paginationArray = new Array(Math.ceil(this.total / this.limit))
          .fill(0)
          .map((_, i) => ({
            page: i + 1,
            limit: this.limit,
            skip: this.limit * i,
          }));
      },
    });

    this.getLimitUser(this.current_page);
  }

  getLimitUser(index: number) {
    this.current_page = index;
    console.log(this.current_page)
    this.userservice.getUsersByPagination(this.paginationArray[this.current_page].limit,
      this.paginationArray[this.current_page].skip,
      this.isSort
    ).subscribe(
      {
        next: (res) => this.userData = res.users
      }
    );
  }

  sortbyNameAsc() {
    this.isSort = !this.isSort;
    this.getLimitUser(this.current_page);
  }

  sortbyNameDesc() {
    this.isSort = !this.isSort;
    this.getLimitUser(this.current_page);
  }
}
