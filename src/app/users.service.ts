import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class UsersService {
  constructor(private http_client: HttpClient) { }

  getUsersByPagination(limit: number, skip: number , isSort:boolean): Observable<any> {
    if(isSort){
      return this.http_client.get(`https://dummyjson.com/users?limit=${limit}&skip=${skip}&sortBy=firstName&order=desc`);
    }else{
      return this.http_client.get(`https://dummyjson.com/users?limit=${limit}&skip=${skip}&sortBy=firstName&order=asc`);
    }
  }

  getTotal(): Observable<any> {
    return this.http_client.get(`https://dummyjson.com/users`)
  }
}
