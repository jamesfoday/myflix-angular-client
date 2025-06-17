import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FetchApiDataService } from '../fetch-api-data.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { GenreDialogComponent } from '../genre-dialog/genre-dialog.component';
import { DirectorDialogComponent } from '../director-dialog/director-dialog.component';
import { MovieDetailsDialogComponent } from '../movie-details-dialog/movie-details-dialog.component';
import { SearchService } from '../search.service';

/**
 * Component that displays a grid of movie cards, supports filtering, 
 * and lets the user add/remove movies from favorites. 
 * Users can also view genre, director, and movie details in dialogs.
 */
@Component({
  selector: 'app-movie-card',
  standalone: false,
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.scss']
})
export class MovieCardComponent implements OnInit {
  /** List of all movies loaded from the API */
  movies: any[] = [];

  /** Movies filtered by search term */
  filteredMovies: any[] = [];

  /** List of user's favorite movie IDs */
  favoriteMovies: string[] = [];

  /** The current search term entered by the user */
  searchTerm: string = '';

  /**
   * Constructs the MovieCardComponent.
   * @param fetchApiData - Service for fetching movie and user data
   * @param searchService - Service for observing the user's search term
   * @param snackBar - Material snackbar for showing notifications
   * @param dialog - Material dialog service for opening dialogs
   */
  constructor(
    public fetchApiData: FetchApiDataService,
    private searchService: SearchService,
    public snackBar: MatSnackBar,
    public dialog: MatDialog
  ) { }

  /**
   * Angular lifecycle hook. Loads all movies and user's favorite movies on component init,
   * and subscribes to the search term for live filtering.
   */
  ngOnInit(): void {
    this.getAllMovies();
    this.getFavoriteMovies();
    // Subscribe to search term changes from SearchService
    this.searchService.searchTerm$.subscribe(term => {
      this.searchTerm = term;
      this.filterMovies();
    });
  }

  /**
   * Fetches all movies from the backend and applies filtering.
   */
  getAllMovies(): void {
    this.fetchApiData.getAllMovies().subscribe({
      next: (movies) => {
        this.movies = movies;
        this.filterMovies();
      },
      error: (err) => {
        this.snackBar.open('Failed to load movies.', 'OK', { duration: 3000 });
      }
    });
  }

  /**
   * Filters movies based on the current search term.
   */
  filterMovies(): void {
    const term = this.searchTerm?.toLowerCase() || '';
    if (!term) {
      this.filteredMovies = this.movies;
      return;
    }
    this.filteredMovies = this.movies.filter(movie =>
      movie.Title.toLowerCase().includes(term)
    );
  }

  /**
   * Retrieves the user's favorite movies from the backend.
   */
  getFavoriteMovies(): void {
    this.fetchApiData.getFavoriteMovies().subscribe({
      next: (user) => {
        if (user && user.FavoriteMovies) {
          this.favoriteMovies = user.FavoriteMovies;
        } else if (Array.isArray(user)) {
          this.favoriteMovies = user;
        } else {
          this.favoriteMovies = [];
        }
      },
      error: () => {
        this.favoriteMovies = [];
      }
    });
  }

  /**
   * Checks if a movie is in the user's favorites.
   * @param movieId - The ID of the movie
   * @returns True if the movie is a favorite, false otherwise
   */
  isFavorite(movieId: string): boolean {
    return this.favoriteMovies.includes(movieId);
  }

  /**
   * Toggles a movie as favorite or removes it from favorites.
   * @param movieId - The ID of the movie to add or remove from favorites
   */
  toggleFavorite(movieId: string): void {
    if (this.isFavorite(movieId)) {
      this.fetchApiData.removeFavoriteMovie(movieId).subscribe({
        next: () => {
          this.snackBar.open('Removed from favorites!', 'OK', { duration: 2000 });
          this.getFavoriteMovies();
        },
        error: () => {
          this.snackBar.open('Failed to remove favorite.', 'OK', { duration: 2000 });
        }
      });
    } else {
      this.fetchApiData.addFavoriteMovie(movieId).subscribe({
        next: () => {
          this.snackBar.open('Added to favorites!', 'OK', { duration: 2000 });
          this.getFavoriteMovies();
        },
        error: () => {
          this.snackBar.open('Failed to add favorite.', 'OK', { duration: 2000 });
        }
      });
    }
  }

  /**
   * Opens a dialog displaying genre details.
   * @param genre - The genre object to display
   */
  openGenreDialog(genre: any): void {
    this.dialog.open(GenreDialogComponent, {
      data: { genre },
      width: '400px'
    });
  }

  /**
   * Opens a dialog displaying director details.
   * @param director - The director object to display
   */
  openDirectorDialog(director: any): void {
    this.dialog.open(DirectorDialogComponent, {
      data: { director },
      width: '400px'
    });
  }

  /**
   * Opens a dialog displaying full movie details.
   * @param movie - The movie object to display
   */
  openMovieDetailsDialog(movie: any): void {
    this.dialog.open(MovieDetailsDialogComponent, {
      data: { movie },
      width: '400px'
    });
  }
}
