import { Component, OnInit } from '@angular/core';
import { UsersService } from '../users.service';
import { Pagination } from '../pagination';
import { Users } from '../users';
import { ToastrService } from 'ngx-toastr';


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
  constructor(private userservice: UsersService, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.userservice.getTotal().subscribe({
      next: (res) => {
        this.total = res.total;
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

  term: string = '';
  search() {
    this.userservice.searchForUser(this.term).subscribe({
      next: (res) => {
        this.userData = res.users
      }
    })
  }

  confirmDelete(index: number) {
    const user_id = this.userData[index].id;
    this.userservice.deleteUser(user_id).subscribe({
      next: (res) => {
        this.toastr.success(`${res.firstName} Deleted successfully! `, 'Success');
        this.userData = this.userData.filter(user => user.id !== this.userData[index].id);
      },
      error: (err) => {
        this.toastr.error('Failed to Delete user.', 'Failure');
      }
    })
  }

  UpdatedData: Users = {
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

  updatedFormShow: boolean = false;
  editIndex: number = 0;
  clickToEditUser(index: number) {
    this.editIndex = index;
    this.updatedFormShow = true;
    this.UpdatedData = { ... this.userData[index] };
  }
  onEditUser() {
    const user_id = this.userData[this.editIndex].id;
    this.userData[this.editIndex] = { ... this.UpdatedData }
    this.userservice.updateUser(user_id, this.UpdatedData).subscribe({
      next: (res) => this.toastr.success(`${res.firstName} Updated successfully! `, 'Success'),
      error: (err) => {
        this.toastr.error('Failed to update user.', 'Failure');
      }
    }
  )
    this.updatedFormShow = false;
  }

  onUserAdded(newUser: any) {
    this.userData.push(newUser);
    this.toastr.success(`${newUser.firstName} Deleted successfully! `, 'Success');
    this.total += 1;
  }
}
