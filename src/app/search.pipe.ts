import { Pipe, PipeTransform } from '@angular/core';
import { UsersService } from './users.service';

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {
  constructor(private userservice: UsersService) { }
  transform(usersData: any[], term: string): any[] {
    this.userservice.searchForUser(term).subscribe({
      next: (res) => {
        console.log(res.users)
        usersData = res.users
        console.log(usersData)
      }
    })
    console.log(usersData);
    return usersData;
  }

}
