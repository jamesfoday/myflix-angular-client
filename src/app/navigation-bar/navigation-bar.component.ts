import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navigation-bar',
  standalone: false,
  templateUrl: './navigation-bar.component.html',
  styleUrls: ['./navigation-bar.component.scss']
})
export class NavigationBarComponent {
  constructor(private router: Router) { }
  get isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }


  logout() {
    // Clear user/auth data, then redirect to welcome/login page
    localStorage.clear();
    this.router.navigate(['/welcome']);
  }
}
