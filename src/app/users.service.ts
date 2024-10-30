import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class UsersService {
  constructor(private http_client:HttpClient) {}

  getUsers():Observable<any>{
    return this.http_client.get(`https://dummyjson.com/users`);
  }


}
