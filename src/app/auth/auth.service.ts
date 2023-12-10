import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  apiUrl: string = 'http://localhost:5000'
  constructor(private _http:HttpClient) { }

  register(user:any)
  {
    this._http.post(this.apiUrl + '/api/register',user);
  }

  login(user:any)
  {
    this._http.post(this.apiUrl + '/api/login',user).pipe(
      tap((res:any) => {
        localStorage.setItem('token', res.token);
      })
    );
  }

  isAuthenticated()
  {
    const token = localStorage.getItem('token');
    if(token == undefined || token == null || token == '')
    {
      return false;
    }
    else
    {
      return true;
    }
  }

  logout()
  {

  }
}
