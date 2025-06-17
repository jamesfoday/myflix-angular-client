import { Component, OnInit, Input } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';
import { MatSnackBar } from '@angular/material/snack-bar';

/**
 * Component that provides a form for new users to register with the myFlix app.
 * Handles form submission, validation, and communicates with the backend API.
 */
@Component({
  selector: 'app-user-registration-form',
  standalone: false,
  templateUrl: './user-registration-form.component.html',
  styleUrls: ['./user-registration-form.component.scss']
})
export class UserRegistrationFormComponent implements OnInit {
  /**
   * The data object bound to the user registration form fields.
   * Includes username, password, email, and birthday.
   */
  @Input() userData = { Username: '', Password: '', Email: '', Birthday: '' };

  /**
   * Controls whether the password field is hidden or visible.
   */
  hide = true;

  /**
   * Constructs the UserRegistrationFormComponent.
   * @param fetchApiData - Service for communicating with the API
   * @param snackBar - Service for showing snack bar notifications
   */
  constructor(
    public fetchApiData: FetchApiDataService,
    public snackBar: MatSnackBar
  ) { }

  /**
   * Angular lifecycle hook. Currently unused but required for interface.
   */
  ngOnInit(): void { }

  /**
   * Registers a new user by sending form data to the backend API.
   * Displays a notification upon success or failure.
   */
  registerUser(): void {
    this.fetchApiData.userRegistration(this.userData).subscribe({
      next: (result) => {
        this.snackBar.open('Registration successful!', 'OK', { duration: 2000 });
      },
      error: (err) => {
        this.snackBar.open('Registration failed: ' + err.error, 'OK', { duration: 4000 });
      }
    });
  }
}
