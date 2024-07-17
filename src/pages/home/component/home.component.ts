import { Component, inject, OnInit } from '@angular/core';
import { AsyncPipe, CommonModule } from "@angular/common";
import { Observable } from "rxjs";
import { tap } from "rxjs/operators";
import { ActivatedRoute, Router } from "@angular/router";

import { StarWarsService } from "src/pages/home/service/starWars.service";
import { TableComponent } from "src/common/table/table.component";
import { PaginationComponent } from "src/common/pagination/pagination.component";

import { CharactersResponse } from "../service/models/character.model";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    TableComponent,
    CommonModule,
    PaginationComponent,
    AsyncPipe
  ],
  template: `
      <app-table [characters]="(characters$ | async)"></app-table>
      <app-pagination
        [currentPage]="currentPage"
        [totalPages]="totalPages"
        (next)="nextPage()"
        (previous)="previousPage()"
      ></app-pagination>
  `,
})

export class HomeComponent implements OnInit {
  characters$!: Observable<CharactersResponse>;
  currentPage = 1;
  totalPages = 1;
  perPage = 10;

  private starWarsService = inject(StarWarsService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);

  ngOnInit() {
    this.route.queryParams.subscribe((params) => {
      const page = params['page'] ? Number(params['page']) : 1;
      this.loadCharacters(page);
    });
  }

  loadCharacters(page: number = 1) {
    this.currentPage = page;
    this.characters$ = this.starWarsService.getCharacters(page).pipe(
      tap(response => {
        this.totalPages = Math.ceil(response.count / this.perPage);
        this.router.navigate([], {queryParams: { page }})
      })
    );
  }

  nextPage() {
    this.loadCharacters(this.currentPage + 1);
  }

  previousPage() {
    if (this.currentPage > 1) {
      this.loadCharacters(this.currentPage - 1);
    }
  }
}
