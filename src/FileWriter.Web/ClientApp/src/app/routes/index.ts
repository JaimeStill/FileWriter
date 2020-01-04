import { Route } from '@angular/router';
import { HomeComponent } from './home/home.component';

export const RouteComponents = [
  HomeComponent
];

export const Routes: Route[] = [
  { path: 'home', component: HomeComponent },
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: '**', redirectTo: 'home', pathMatch: 'full' }
];
