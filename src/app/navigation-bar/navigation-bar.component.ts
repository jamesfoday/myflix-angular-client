import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { SearchService } from '../search.service'; // Import here

@Component({
  selector: 'app-navigation-bar',
  standalone: false,
  templateUrl: './navigation-bar.component.html',
  styleUrls: ['./navigation-bar.component.scss']
})
export class NavigationBarComponent {
  constructor(private router: Router, private searchService: SearchService) { }

  get isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }

  onSearch(event: Event) {
    const value = (event.target as HTMLInputElement).value;
    this.searchService.setSearchTerm(value);  // Use the service instead of emit
  }

  logout() {
    localStorage.clear();
    this.router.navigate(['/welcome']);
  }
}
