import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

const apiUrl = 'https://murmuring-dusk-30240-f46e356bdd77.herokuapp.com';

@Injectable({
  providedIn: 'root'
})
export class FetchApiDataService {
  apiUrl = apiUrl;
  constructor(private http: HttpClient) { }

  /** User Registration */
  public userRegistration(userDetails: any): Observable<any> {
    return this.http.post(`${apiUrl}/users`, userDetails).pipe(
      catchError(this.handleError)
    );
  }

  /** User Login */
  public userLogin(userDetails: any): Observable<any> {
    return this.http.post(`${apiUrl}/users/login`, userDetails).pipe(
      catchError(this.handleError)
    );
  }

  /** Get All Movies */
  public getAllMovies(): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.get(`${apiUrl}/movies`, {
      headers: new HttpHeaders({ Authorization: 'Bearer ' + token })
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  /** Get One Movie By Title */
  public getMovie(title: string): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.get(`${apiUrl}/movies/${title}`, {
      headers: new HttpHeaders({ Authorization: 'Bearer ' + token })
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  /** Get Genre */
  public getGenre(genreName: string): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.get(`${apiUrl}/genres/${genreName}`, {
      headers: new HttpHeaders({ Authorization: 'Bearer ' + token })
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  /** Get Director */
  public getDirector(directorName: string): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.get(`${apiUrl}/directors/${directorName}`, {
      headers: new HttpHeaders({ Authorization: 'Bearer ' + token })
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  /** Get Current User Info (by username) */
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

  /** Edit User Info (by username) */
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

  /** Delete User Account (by userId) */
  public deleteUser(): Observable<any> {
    const token = localStorage.getItem('token');
    const userId = localStorage.getItem('userId'); // use _id for delete
    return this.http.delete(`${apiUrl}/users/${userId}`, {
      headers: new HttpHeaders({ Authorization: 'Bearer ' + token })
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  /** Get Favorite Movies */
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

  /** Add a movie to the user's favorites */
  public addFavoriteMovie(movieId: string): Observable<any> {
    const token = localStorage.getItem('token');
    const userId = localStorage.getItem('userId'); // _id
    return this.http.post(
      `${apiUrl}/users/${userId}/favorites`,
      { movieId }, // send movieId in the body
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

  /** Remove a movie from the user's favorites */
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

  // --- Helpers ---
  private extractResponseData(res: any): any {
    return res || {};
  }
  private handleError(error: HttpErrorResponse): any {
    if (error.error instanceof ErrorEvent) {
      console.error('Client-side error:', error.error.message);
    } else {
      console.error(`Server returned code ${error.status}, body was:`, error.error);
    }
    return throwError(() => new Error('Something bad happened; please try again later.'));
  }
}
