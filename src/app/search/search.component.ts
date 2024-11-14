import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Users } from '../users';
import { UsersService } from './../users.service';
import { Component } from '@angular/core';


@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrl: './search.component.css'
})
export class SearchComponent{
  constructor(private userservice: UsersService){}
  result : Users[]= [];
  searchForm: FormGroup = new FormGroup({
    inputSearch: new FormControl(null, [Validators.required])
  });

  submitSearch(searchForm: FormGroup){
    console.log(searchForm.value.inputSearch);
    this.userservice.searchForUser(searchForm.value.inputSearch).subscribe({
      next: (res)=>{
        console.log(res)
        this.result= res.users
      }
    })  
  }
}
