import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private httpClient:HttpClient , private router:Router) { }

  signIn(formData : object):Observable<any>{
    return this.httpClient.post(`https://dummyjson.com/user/login`,formData)
  }

  LoginAuth(accessToken : string):Observable<any>{
    accessToken = accessToken.replace(/^"|"$/g, '');
    const result = 'Bearer ' + accessToken;
    console.log(accessToken);
    const headers = new HttpHeaders({
      Authorization: accessToken,
    });
    return this.httpClient.get('https://dummyjson.com/user/me', { headers });
  }

  logOut(){
    const userToken = localStorage.setItem('userToken',"");
    const userID = localStorage.setItem('userID',"");
    this.router.navigate(['/login']);
  }

  isLogin() :boolean{
    const token = localStorage.getItem('userToken'); 
    console.log(token)
    return token !== null && token !== '';
  }
}
