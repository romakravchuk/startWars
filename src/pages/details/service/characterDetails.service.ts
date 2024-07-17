import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { CharacterDetails } from "./models/characterDetails.model";

@Injectable({
  providedIn: 'root'
})
export class CharacterDetailsService {
  private baseUrl: string = 'https://swapi.dev/api/people/';

  constructor(private http: HttpClient) {}

  getCharacterDetails(characterId: string): Observable<CharacterDetails> {
    const url = `${this.baseUrl}${characterId}`;
    return this.http.get<CharacterDetails>(url);
  }
}
