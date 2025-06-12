import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FetchApiDataService } from '../fetch-api-data.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { GenreDialogComponent } from '../genre-dialog/genre-dialog.component';
import { DirectorDialogComponent } from '../director-dialog/director-dialog.component';
import { MovieDetailsDialogComponent } from '../movie-details-dialog/movie-details-dialog.component';
import { SearchService } from '../search.service';

@Component({
  selector: 'app-movie-card',
  standalone: false,
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.scss']
})
export class MovieCardComponent implements OnInit {
  movies: any[] = [];
  filteredMovies: any[] = [];
  favoriteMovies: string[] = [];
  searchTerm: string = '';

  constructor(
    public fetchApiData: FetchApiDataService,
    private searchService: SearchService,
    public snackBar: MatSnackBar,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.getAllMovies();
    this.getFavoriteMovies();
    // Subscribe to search term changes from SearchService
    this.searchService.searchTerm$.subscribe(term => {
      this.searchTerm = term;
      this.filterMovies();
    });
  }

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

  isFavorite(movieId: string): boolean {
    return this.favoriteMovies.includes(movieId);
  }

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

  openGenreDialog(genre: any): void {
    this.dialog.open(GenreDialogComponent, {
      data: { genre },
      width: '400px'
    });
  }

  openDirectorDialog(director: any): void {
    this.dialog.open(DirectorDialogComponent, {
      data: { director },
      width: '400px'
    });
  }

  openMovieDetailsDialog(movie: any): void {
    this.dialog.open(MovieDetailsDialogComponent, {
      data: { movie },
      width: '400px'
    });
  }
}
