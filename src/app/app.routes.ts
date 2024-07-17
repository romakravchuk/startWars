import { Routes } from '@angular/router';
import { HomeComponent } from "src/pages/home/component/home.component";
import { DetailsComponent } from "src/pages/details/component/details.component";

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    title: 'Home page',
  },
  {
    path: 'details/:name',
    component: DetailsComponent,
    title: 'Character details',
  }
];
