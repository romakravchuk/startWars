import {inject, Injectable} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { tap } from 'rxjs/operators';
import { HttpCacheService } from "src/common/services/httpCache.service";

import { CharactersResponse } from "./models/character.model";

@Injectable({
  providedIn: 'root'
})

export class StarWarsService {
  private baseUrl = 'https://swapi.dev/api/people';
  private cacheService = inject(HttpCacheService);

  constructor(private http: HttpClient) {
    this.loadCacheFromLocalStorage();
  }

  private loadCacheFromLocalStorage() {
    const cachedData = localStorage.getItem('charactersCache');
    if (cachedData) {
      const cache = JSON.parse(cachedData);
      this.cacheService.replaceAll(cache);
    }
  }

  private updateLocalStorage() {
    const cacheData = JSON.stringify(Array.from(this.cacheService.getAll()));
    localStorage.setItem('charactersCache', cacheData);
  }

  getCharacters(page: number = 1): Observable<CharactersResponse> {
    const url = `${this.baseUrl}?page=${page}`;
    const cachedResponse = this.cacheService.get(url);

    if (cachedResponse) {
      return of(cachedResponse);
    } else {
      return this.http.get<CharactersResponse>(`${this.baseUrl}?page=${page}`).pipe(
        tap((response) => {
          this.cacheService.put(url, response);
          this.updateLocalStorage();
        })
      );
    }
  }
}
