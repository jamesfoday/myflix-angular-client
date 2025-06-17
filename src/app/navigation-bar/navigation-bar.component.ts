import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { SearchService } from '../search.service';

/**
 * The main navigation bar component for the myFlix Angular client.
 * Provides navigation links, search functionality, and logout action.
 */
@Component({
  selector: 'app-navigation-bar',
  standalone: false,
  templateUrl: './navigation-bar.component.html',
  styleUrls: ['./navigation-bar.component.scss']
})
export class NavigationBarComponent {
  /**
   * Constructs the NavigationBarComponent.
   * @param router - Angular Router for navigation
   * @param searchService - Service for handling the movie search functionality
   */
  constructor(private router: Router, private searchService: SearchService) { }

  /**
   * Checks if the user is currently logged in.
   * @returns True if the user is logged in, otherwise false
   */
  get isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }

  /**
   * Handles search input and updates the search term in the SearchService.
   * @param event - The input event from the search box
   */
  onSearch(event: Event) {
    const value = (event.target as HTMLInputElement).value;
    this.searchService.setSearchTerm(value);
  }

  /**
   * Logs the user out by clearing local storage and navigating to the welcome page.
   */
  logout() {
    localStorage.clear();
    this.router.navigate(['/welcome']);
  }
}
