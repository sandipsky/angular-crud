import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterModule, FormsModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  loginForm: FormGroup

  constructor(
    private _fb: FormBuilder,
    private _authService: AuthService, 
    private _router: Router,
    private toastr: ToastrService
    )
  {
    this.loginForm = this._fb.group({
      user_name: [,Validators.required],
      password: [,Validators.required]
    })
  }

  loginUser()
  {
    this._authService.login(this.loginForm.value).subscribe({
      next: (data:any) => {
       
        this.toastr.success('Login Successfull', 'Success', {
          closeButton: true,
        });
         this._router.navigate(['home']);

      },
      error: (err: any) => {
        this.toastr.error(err.message, 'Error', {
          closeButton: true,
        });
      },
    })
  }

}
