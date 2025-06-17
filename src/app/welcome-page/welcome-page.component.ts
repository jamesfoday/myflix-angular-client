import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { UserRegistrationFormComponent } from '../user-registration-form/user-registration-form.component';
import { UserLoginFormComponent } from '../user-login-form/user-login-form.component';

/**
 * The welcome page component for the myFlix Angular client.
 * Provides buttons to open the registration and login dialogs.
 */
@Component({
  selector: 'app-welcome-page',
  standalone: false,
  templateUrl: './welcome-page.component.html',
  styleUrl: './welcome-page.component.scss'
})
export class WelcomePageComponent {
  /** Controls which form (login or registration) to show */
  showLogin = true;

  /**
   * Constructs the WelcomePageComponent.
   * @param dialog - Material Dialog service for opening modal dialogs
   */
  constructor(public dialog: MatDialog) { }

  /**
   * Opens the user registration dialog.
   */
  openUserRegistrationDialog(): void {
    this.dialog.open(UserRegistrationFormComponent, { width: '280px' });
  }

  /**
   * Opens the user login dialog.
   */
  openUserLoginDialog(): void {
    this.dialog.open(UserLoginFormComponent, { width: '280px' });
  }
}
