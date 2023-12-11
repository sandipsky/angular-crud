import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../auth/auth.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [RouterModule, FormsModule, ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {


  registerForm: FormGroup

  constructor(
    private _fb: FormBuilder,
    private _authService: AuthService, 
    private _router: Router,
    private toastr: ToastrService
    )
  {
    this.registerForm = this._fb.group({
      user_name: [,Validators.required],
      full_name: [,Validators.required],
      password: [,Validators.required]
    })
  }

  registerUser()
  {
    this._authService.register(this.registerForm.value).subscribe({
      next: (data:any) => {
        this.toastr.success('User Registered Succesfully! Please Sign In', 'Success', {
          closeButton: true,
        });
         this._router.navigate(['login']);

      },
      error: (err: any) => {
        this.toastr.error(err.message, 'Error', {
          closeButton: true,
        });
      },
    })
  }

}
