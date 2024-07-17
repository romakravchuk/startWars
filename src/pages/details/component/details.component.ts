import { Component, inject, OnInit } from '@angular/core';
import { AsyncPipe, Location } from "@angular/common";
import { ActivatedRoute } from "@angular/router";
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { Observable} from "rxjs";
import { tap } from "rxjs/operators";

import { CharacterDetailsService } from "../service/characterDetails.service";
import { CharacterDetails } from "../service/models/characterDetails.model";

@Component({
  selector: 'app-details',
  standalone: true,
  imports: [ReactiveFormsModule, AsyncPipe],
  template: `
    <div class="flex-container">
      <div>
        <h4>Details page,</h4>
        <h1>{{ (characterDetails$ | async)?.name }}</h1>
      </div>
      <button (click)="navigateBack()">Back</button>
    </div>
    <form [formGroup]="characterForm" (ngSubmit)="submitForm()">
      <label for="name">Name:</label>
      <input id="name" type="text" formControlName="name">

      <label for="height">Height:</label>
      <input id="height" type="text" formControlName="height">

      <label for="mass">Mass:</label>
      <input id="mass" type="text" formControlName="mass">

      <button type="submit">Submit</button>
    </form>
  `,
  styleUrl: './details.component.css'
})

export class DetailsComponent implements OnInit {
  characterForm!: FormGroup;
  characterDetails$!: Observable<CharacterDetails>;

  private location = inject(Location);
  private route = inject(ActivatedRoute);
  private characterDetailsService = inject(CharacterDetailsService);

  ngOnInit() {
    this.characterForm = new FormGroup({
      name: new FormControl('', Validators.required),
      height: new FormControl('', Validators.required),
      mass: new FormControl('', Validators.required),
    });

    this.loadCharacterDetails();
  }

  loadCharacterDetails() {
    this.route.queryParams.subscribe((params) => {
      const characterId = params['id'];
      if (!characterId) return;

      this.characterDetails$ = this.characterDetailsService.getCharacterDetails(characterId).pipe(
        tap((details) => {
          this.characterForm.patchValue({
            name: details.name,
            height: details.height,
            mass: details.mass,
          });
        })
      );
    });
  }

  submitForm() {
    console.log(this.characterForm.value);
  }

  navigateBack() {
    this.location.back();
  }
}
