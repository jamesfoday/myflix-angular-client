import { Component, OnInit } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';
import { MatSnackBar } from '@angular/material/snack-bar';

/**
 * Displays the user's list of favorite movies.
 * Allows removing movies from the list of favorites.
 */
@Component({
  selector: 'app-favorites',
  standalone: false,
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.scss']
})
export class FavoritesComponent implements OnInit {
  /** The list of full movie objects the user has marked as favorite */
  favoriteMovies: any[] = [];
  /** The list of favorite movie IDs */
  favoriteMovieIds: string[] = [];

  /**
   * Constructs the FavoritesComponent.
   * @param fetchApiData - Service to interact with the myFlix API
   * @param snackBar - Material Snackbar for feedback messages
   */
  constructor(
    private fetchApiData: FetchApiDataService,
    private snackBar: MatSnackBar
  ) { }

  /**
   * Angular lifecycle hook. Loads favorite movies when the component is initialized.
   */
  ngOnInit(): void {
    this.loadFavoriteMovies();
  }

  /**
   * Loads the user's favorite movies by fetching their favorite movie IDs,
   * then filtering all movies for those IDs.
   */
  loadFavoriteMovies(): void {
    this.fetchApiData.getFavoriteMovies().subscribe({
      next: (favData) => {
        this.favoriteMovieIds = favData.FavoriteMovies || [];
        this.fetchApiData.getAllMovies().subscribe({
          next: (allMovies) => {
            this.favoriteMovies = allMovies.filter((movie: any) =>
              this.favoriteMovieIds.includes(movie._id)
            );
          }
        });
      }
    });
  }

  /**
   * Checks if a movie is in the user's favorites.
   * @param movieId - The ID of the movie
   * @returns True if the movie is a favorite, otherwise false
   */
  isFavorite(movieId: string): boolean {
    return this.favoriteMovieIds.includes(movieId);
  }

  /**
   * Removes a movie from the user's favorites and refreshes the list.
   * @param movieId - The ID of the movie to remove
   */
  toggleFavorite(movieId: string): void {
    if (this.isFavorite(movieId)) {
      this.fetchApiData.removeFavoriteMovie(movieId).subscribe({
        next: () => {
          this.snackBar.open('Removed from favorites!', 'OK', { duration: 2000 });
          this.loadFavoriteMovies(); // Refresh grid
        },
        error: () => {
          this.snackBar.open('Failed to remove favorite.', 'OK', { duration: 2000 });
        }
      });
    }
  }
}
