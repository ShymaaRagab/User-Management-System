import { Component, EventEmitter, Output } from '@angular/core';
import { UsersService } from '../../users.service';
import { Users } from '../../users';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrl: './add-user.component.css'
})
export class AddUserComponent {
  constructor(private userservice: UsersService){}
  @Output() userAddedData = new EventEmitter<any>();
  addUserForm: FormGroup = new FormGroup({
    firstName: new FormControl(null, [Validators.required, Validators.minLength(3)]),
    lastName: new FormControl(null, [Validators.required, Validators.minLength(3)]),
    age: new FormControl(null, [Validators.required, Validators.min(20),Validators.max(100)]),
    gender: new FormControl(null, [Validators.required]),
    company: new FormGroup({
      department: new FormControl(null, [Validators.required, Validators.minLength(10)]),
      title: new FormControl(null, [Validators.required, Validators.minLength(5)])
    }),
    role: new FormControl(null, [Validators.required, Validators.minLength(3)]),
  });
  isLoad: boolean = false;
  errorM: any = '';

  showAddForm:boolean= false;
  onClickAdd(){
    this.showAddForm =true;
  }
  onAdd(addUserForm: FormGroup){
    const userData =addUserForm.value;
    this.userservice.addNewUser(userData).subscribe({
      next:(res)=> this.userAddedData.emit(res)
    })
    this.showAddForm = false;

  }
}
