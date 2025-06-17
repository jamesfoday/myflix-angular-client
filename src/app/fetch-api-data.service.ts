import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

const apiUrl = 'https://murmuring-dusk-30240-f46e356bdd77.herokuapp.com';

/**
 * Service for communicating with the myFlix backend REST API.
 * Handles user registration, login, profile management, movies, favorites, and error handling.
 */
@Injectable({
  providedIn: 'root'
})
export class FetchApiDataService {
  apiUrl = apiUrl;

  /**
   * Constructs the FetchApiDataService.
   * @param http - Angular HTTP client for API requests
   */
  constructor(private http: HttpClient) { }

  /**
   * Registers a new user.
   * @param userDetails - The registration data for the new user
   * @returns Observable with server response
   */
  public userRegistration(userDetails: any): Observable<any> {
    return this.http.post(`${apiUrl}/users`, userDetails).pipe(
      catchError(this.handleError)
    );
  }

  /**
   * Logs in a user.
   * @param userDetails - The user's login credentials
   * @returns Observable with JWT and user data
   */
  public userLogin(userDetails: any): Observable<any> {
    return this.http.post(`${apiUrl}/users/login`, userDetails).pipe(
      catchError(this.handleError)
    );
  }

  /**
   * Retrieves all movies from the backend.
   * @returns Observable with array of movie objects
   */
  public getAllMovies(): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.get(`${apiUrl}/movies`, {
      headers: new HttpHeaders({ Authorization: 'Bearer ' + token })
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  /**
   * Retrieves details for a specific movie by title.
   * @param title - The title of the movie
   * @returns Observable with movie details
   */
  public getMovie(title: string): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.get(`${apiUrl}/movies/${title}`, {
      headers: new HttpHeaders({ Authorization: 'Bearer ' + token })
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  /**
   * Retrieves details for a specific genre.
   * @param genreName - The name of the genre
   * @returns Observable with genre details
   */
  public getGenre(genreName: string): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.get(`${apiUrl}/genres/${genreName}`, {
      headers: new HttpHeaders({ Authorization: 'Bearer ' + token })
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  /**
   * Retrieves details for a specific director.
   * @param directorName - The name of the director
   * @returns Observable with director details
   */
  public getDirector(directorName: string): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.get(`${apiUrl}/directors/${directorName}`, {
      headers: new HttpHeaders({ Authorization: 'Bearer ' + token })
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  /**
   * Retrieves the current user's information.
   * @returns Observable with user details
   */
  public getUser(): Observable<any> {
    const token = localStorage.getItem('token');
    const username = localStorage.getItem('user'); // plain string!
    return this.http.get(`${apiUrl}/users/${username}`, {
      headers: new HttpHeaders({ Authorization: 'Bearer ' + token })
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  /**
   * Updates the current user's profile.
   * @param userDetails - The updated user information
   * @returns Observable with updated user details
   */
  public editUser(userDetails: any): Observable<any> {
    const token = localStorage.getItem('token');
    const username = localStorage.getItem('user');
    return this.http.put(`${apiUrl}/users/${username}`, userDetails, {
      headers: new HttpHeaders({ Authorization: 'Bearer ' + token })
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  /**
   * Deletes the current user's account.
   * @returns Observable with server response
   */
  public deleteUser(): Observable<any> {
    const token = localStorage.getItem('token');
    const userId = localStorage.getItem('userId');
    return this.http.delete(`${apiUrl}/users/${userId}`, {
      headers: new HttpHeaders({ Authorization: 'Bearer ' + token })
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  /**
   * Retrieves the list of the user's favorite movies.
   * @returns Observable with array of favorite movie IDs
   */
  public getFavoriteMovies(): Observable<any> {
    const token = localStorage.getItem('token');
    const userId = localStorage.getItem('userId');
    return this.http.get(`${apiUrl}/users/${userId}/favorites`, {
      headers: new HttpHeaders({ Authorization: 'Bearer ' + token })
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  /**
   * Adds a movie to the user's favorites.
   * @param movieId - The ID of the movie to add
   * @returns Observable with updated user data
   */
  public addFavoriteMovie(movieId: string): Observable<any> {
    const token = localStorage.getItem('token');
    const userId = localStorage.getItem('userId');
    return this.http.post(
      `${apiUrl}/users/${userId}/favorites`,
      { movieId },
      {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
          'Content-Type': 'application/json',
        }),
      }
    ).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  /**
   * Removes a movie from the user's favorites.
   * @param movieId - The ID of the movie to remove
   * @returns Observable with updated user data
   */
  public removeFavoriteMovie(movieId: string): Observable<any> {
    const token = localStorage.getItem('token');
    const userId = localStorage.getItem('userId');
    return this.http.delete(
      `${apiUrl}/users/${userId}/favorites/${movieId}`,
      {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token
        })
      }
    ).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  /**
   * Helper: Extracts data from HTTP response.
   * @param res - The HTTP response object
   * @returns The response body, or an empty object if missing
   */
  private extractResponseData(res: any): any {
    return res || {};
  }

  /**
   * Helper: Handles HTTP errors for all requests.
   * @param error - The HTTP error response
   * @returns Observable that errors with a user-friendly message
   */
  private handleError(error: HttpErrorResponse): any {
    if (error.error instanceof ErrorEvent) {
      console.error('Client-side error:', error.error.message);
    } else {
      console.error(`Server returned code ${error.status}, body was:`, error.error);
    }
    return throwError(() => new Error('Something bad happened; please try again later.'));
  }
}
