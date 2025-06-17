import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FetchApiDataService } from '../fetch-api-data.service';
import { MatSnackBar } from '@angular/material/snack-bar';

/**
 * Component that provides a form for users to log in to the myFlix app.
 * Handles form submission, authentication, and redirects the user upon success.
 */
@Component({
  selector: 'app-user-login-form',
  standalone: false,
  templateUrl: './user-login-form.component.html',
  styleUrls: ['./user-login-form.component.scss']
})
export class UserLoginFormComponent {
  /**
   * The data object bound to the user login form fields.
   * Includes username and password.
   */
  userData = { Username: '', Password: '' };

  /**
   * Controls whether the password field is hidden or visible.
   */
  hide = true;

  /**
   * Constructs the UserLoginFormComponent.
   * @param fetchApiData - Service for authenticating the user via API
   * @param router - Angular router for navigation after successful login
   * @param snackBar - Material service for showing notifications
   */
  constructor(
    private fetchApiData: FetchApiDataService,
    private router: Router,
    private snackBar: MatSnackBar
  ) { }

  /**
   * Logs in the user by sending the entered credentials to the backend API.
   * On success, saves the JWT token and user info to localStorage and navigates to movies.
   * On failure, shows an error notification.
   */
  loginUser(): void {
    this.fetchApiData.userLogin(this.userData).subscribe(
      (result) => {
        // Save only the string username and userId, NOT the whole user object!
        localStorage.setItem('token', result.token);

        // Save username and userId from the backend response.
        localStorage.setItem('user', result.user.Username);
        localStorage.setItem('userId', result.user._id);

        this.snackBar.open('Login successful!', 'OK', { duration: 3000 });
        // Navigate to movies/main page
        this.router.navigate(['movies']);
      },
      (error) => {
        this.snackBar.open('Login failed. Please check your credentials.', 'OK', { duration: 3000 });
      }
    );
  }
}
