import { Component } from '@angular/core';
import { UserRegistrationFormComponent } from './user-registration-form/user-registration-form.component';
import { UserLoginFormComponent } from './user-login-form/user-login-form.component';
import { MatDialog } from '@angular/material/dialog';

/**
 * The root component for the myFlix Angular client application.
 * Handles displaying the main navigation and dialogs for user registration and login.
 */
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: false,
  styleUrl: './app.component.scss'
})
export class AppComponent {
  /** Application title shown in the header */
  title = 'myFlix-Angular-client';

  /**
   * Initializes the AppComponent with Angular Material dialog service.
   * @param dialog - Reference to MatDialog for opening modal dialogs
   */
  constructor(public dialog: MatDialog) { }

  /**
   * Returns whether the user is currently logged in (token exists in localStorage).
   */
  get isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }

  /**
   * Opens the user registration dialog modal.
   */
  openUserRegistrationDialog(): void {
    this.dialog.open(UserRegistrationFormComponent, { width: '280px' });
  }

  /**
   * Opens the user login dialog modal.
   */
  openUserLoginDialog(): void {
    this.dialog.open(UserLoginFormComponent, {
      width: '280px'
    });
  }
}
