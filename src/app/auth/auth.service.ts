import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  apiUrl: string = 'http://localhost:5000'
  constructor(
    private _http:HttpClient,
     private _router:Router,
    private toastr: ToastrService
     
     ) { }

  register(user:any): Observable<any>
  {
    return this._http.post(this.apiUrl + '/api/auth/register',user);
  }

  login(user:any): Observable<any>
  {
    return this._http.post(this.apiUrl + '/api/auth/login',user).pipe(
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
    localStorage.removeItem('token');
    this.toastr.success('Logout Successfully', 'Success', {
      closeButton: true,
    });
    this._router.navigate(['login']);
  }

  
}
