import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class UsersService {
  constructor(private http_client: HttpClient) { }

  getUsersByPagination(limit: number, skip: number, isSort: boolean): Observable<any> {
    if (isSort) {
      return this.http_client.get(`https://dummyjson.com/users?limit=${limit}&skip=${skip}&sortBy=firstName&order=desc`);
    } else {
      return this.http_client.get(`https://dummyjson.com/users?limit=${limit}&skip=${skip}&sortBy=firstName&order=asc`);
    }
  }

  getTotal(): Observable<any> {
    return this.http_client.get(`https://dummyjson.com/users`)
  }

  deleteUser(index: number): Observable<any> {
    return this.http_client.delete(`https://dummyjson.com/users/${index}`);
  }

  updateUser(index: number, updateData: object): Observable<any> {
    return this.http_client.put(`https://dummyjson.com/users/${index}`, updateData);
  }

  addNewUser(userData: object): Observable<any> {
    return this.http_client.post(`https://dummyjson.com/users/add`, userData);
  }

  searchForUser(term: string): Observable<any>{
    return this.http_client.get(`https://dummyjson.com/users/search?q=${term}`);
  }
}
