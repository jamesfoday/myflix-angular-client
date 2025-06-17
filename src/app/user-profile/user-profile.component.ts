import { Component, OnInit } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

/**
 * Component for displaying and managing the user's profile.
 * Allows viewing, editing, and deleting user profile information.
 */
@Component({
  selector: 'app-user-profile',
  standalone: false,
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.scss'
})
export class UserProfileComponent implements OnInit {
  /** Indicates whether the profile is currently in edit mode */
  isEditing = false;

  /** The current user's data fetched from the backend */
  user: any = {};

  /** Copy of user data used for editing before saving changes */
  editableUser: any = {};

  /**
   * Constructs the UserProfileComponent.
   * @param fetchApiData - Service for interacting with the backend API
   * @param snackBar - Service for showing notifications
   * @param router - Angular router for navigation
   */
  constructor(
    private fetchApiData: FetchApiDataService,
    private snackBar: MatSnackBar,
    private router: Router
  ) { }

  /**
   * Angular lifecycle hook. Loads the current user's profile on initialization.
   */
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

  /**
   * Saves the updated user profile to the backend.
   * On success, updates the local user data and shows a notification.
   */
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

  /**
   * Cancels profile editing and exits edit mode without saving changes.
   */
  cancelEdit(): void {
    this.isEditing = false;
  }

  /**
   * Deletes the user's profile from the backend.
   * On success, clears local storage and navigates to the welcome page.
   */
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
