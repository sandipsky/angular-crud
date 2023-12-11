import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss'
})
export class LayoutComponent {
  constructor(private _authService: AuthService)
  {}


  isAuthenticated()
  {
    return this._authService.isAuthenticated();
  }

  logout()
  {
    this._authService.logout();
  }
}
