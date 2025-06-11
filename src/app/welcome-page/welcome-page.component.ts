import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { UserRegistrationFormComponent } from '../user-registration-form/user-registration-form.component';
import { UserLoginFormComponent } from '../user-login-form/user-login-form.component';

@Component({
  selector: 'app-welcome-page',
  standalone: false,
  templateUrl: './welcome-page.component.html',
  styleUrl: './welcome-page.component.scss'
})
export class WelcomePageComponent {
  showLogin = true;
  constructor(public dialog: MatDialog) { }
  openUserRegistrationDialog(): void {
    this.dialog.open(UserRegistrationFormComponent, { width: '280px' });
  }
  openUserLoginDialog(): void {
    this.dialog.open(UserLoginFormComponent, { width: '280px' });
  }
}