import { Component, OnInit, Input } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FetchApiDataService } from '../fetch-api-data.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-user-login-form',
  standalone: false,
  templateUrl: './user-login-form.component.html',
  styleUrl: './user-login-form.component.scss'
})
export class UserLoginFormComponent implements OnInit {
  @Input() userData = { Username: '', Password: '' };

  constructor(
    public fetchApiData: FetchApiDataService,
    public dialogRef: MatDialogRef<UserLoginFormComponent>,
    public snackBar: MatSnackBar
  ) { }

  ngOnInit(): void { }

  loginUser(): void {
    this.fetchApiData.userLogin(this.userData).subscribe((result) => {
      // Save credentials in localStorage
      localStorage.setItem('token', result.token);
      localStorage.setItem('user', result.user.Username);

      this.dialogRef.close(); // Close the modal
      this.snackBar.open('Login successful!', 'OK', { duration: 2000 });
    }, (err) => {
      this.snackBar.open(err, 'OK', { duration: 2000 });
    });
  }
}
