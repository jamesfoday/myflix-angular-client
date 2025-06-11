import { Component, OnInit } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-favorites',
  standalone: false,
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.scss']
})
export class FavoritesComponent implements OnInit {
  favoriteMovies: any[] = [];
  favoriteMovieIds: string[] = [];

  constructor(
    private fetchApiData: FetchApiDataService,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.loadFavoriteMovies();
  }

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

  isFavorite(movieId: string): boolean {
    return this.favoriteMovieIds.includes(movieId);
  }

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
