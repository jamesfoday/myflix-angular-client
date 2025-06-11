import { Component, OnInit } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';


@Component({
  selector: 'app-user-profile',
  standalone: false,
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.scss'
})
export class UserProfileComponent implements OnInit {
  isEditing = false;
  user: any = {};
  editableUser: any = {};

  constructor(
    private fetchApiData: FetchApiDataService,
    private snackBar: MatSnackBar,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.fetchApiData.getUser().subscribe({
      next: (user) => {
        this.user = user;
        this.editableUser = { ...user };
      },
      error: (err) => {
        this.snackBar.open('Could not fetch user profile.', 'OK', { duration: 3000 });
      }
    });
  }


  saveProfile(): void {
    this.fetchApiData.editUser(this.editableUser).subscribe({
      next: (res) => {
        this.snackBar.open('Profile updated successfully!', 'OK', { duration: 3000 });
        this.user = res;
      },
      error: (err) => {
        this.snackBar.open('Failed to update profile.', 'OK', { duration: 3000 });
      }

    });
    this.isEditing = false;
  }

  cancelEdit(): void {
    this.isEditing = false;
  }

  deleteProfile(): void {
    this.fetchApiData.deleteUser().subscribe({
      next: () => {
        this.snackBar.open('Profile deleted', 'OK', { duration: 3000 });
        // Clear localStorage and redirect to welcome
        localStorage.clear();
        this.router.navigate(['welcome']);
      },
      error: (err) => {
        this.snackBar.open('Failed to delete profile.', 'OK', { duration: 3000 });
      }
    });
  }
}