import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root' // Makes it available app-wide
})
export class SearchService {
  private searchTermSubject = new BehaviorSubject<string>(''); // Initial value is empty string
  searchTerm$ = this.searchTermSubject.asObservable();

  setSearchTerm(term: string) {
    this.searchTermSubject.next(term);
  }
}
