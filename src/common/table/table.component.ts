import { Component, inject, Input } from '@angular/core';
import { Router } from "@angular/router";
import { CharactersResponse } from "src/pages/home/service/models/character.model";

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [],
  template: `
    <table>
      <thead>
      <tr>
        <th>Name</th>
        <th>Height</th>
        <th>Mass</th>
        <th>Hair Color</th>
      </tr>
      </thead>
      <tbody>
        @if (characters) {
          @for (character of characters.results; track character.name) {
            <tr (click)="navigateToDetails(character.name, character.url)">
              <td>{{ character.name }}</td>
              <td>{{ character.height }}</td>
              <td>{{ character.mass }}</td>
              <td>{{ character.hair_color }}</td>
            </tr>
          }
        } @else {
          <tr>
            <td colspan="4">Loading...</td>
          </tr>
        }
      </tbody>
    </table>`,
  styleUrl: './table.component.css'
})

export class TableComponent {
  @Input() characters!: CharactersResponse | null ;

  private router = inject(Router);

  extractIdFromUrl(url: string): string {
    const parts = url.split('/').filter(part => part !== '');
    return parts[parts.length - 1];
  }

  navigateToDetails(name: string, url: string) {
    const characterId = this.extractIdFromUrl(url);
    this.router.navigate(['details', name.toLowerCase().replaceAll(' ', '-')], {queryParams: {id: characterId}});
  }
}
