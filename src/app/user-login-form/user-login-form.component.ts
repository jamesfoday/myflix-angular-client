import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FetchApiDataService } from '../fetch-api-data.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-user-login-form',
  standalone: false,
  templateUrl: './user-login-form.component.html',
  styleUrls: ['./user-login-form.component.scss']
})
export class UserLoginFormComponent {
  userData = { Username: '', Password: '' };

  constructor(
    private fetchApiData: FetchApiDataService,
    private router: Router,
    private snackBar: MatSnackBar
  ) { }

  loginUser(): void {
    this.fetchApiData.userLogin(this.userData).subscribe(
      (result) => {
        // Save only the string username and userId, NOT the whole user object!
        localStorage.setItem('token', result.token);

        // Depending on your backend's response structure:
        // If result.user exists (as in your backend), use:
        localStorage.setItem('user', result.user.Username);  // Username as string
        localStorage.setItem('userId', result.user._id);     // _id as string

        // If just result.Username and result._id, then:
        // localStorage.setItem('user', result.Username);
        // localStorage.setItem('userId', result._id);

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
