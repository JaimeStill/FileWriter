import { Injectable } from '@angular/core';
import { OverlayContainer } from '@angular/cdk/overlay';
import { BehaviorSubject } from 'rxjs';
import { Theme } from '../models';

@Injectable()
export class ThemeService {
  private themes = new BehaviorSubject<Theme[]>([
    { name: 'light-green', display: 'Light Green' },
    { name: 'dark-green', display: 'Dark Green' },
    { name: 'light-blue', display: 'Light Blue' },
    { name: 'dark-blue', display: 'Dark Blue' },
    { name: 'light-red', display: 'Light Red' },
    { name: 'dark-red', display: 'Dark Red' },
    { name: 'light-indigo', display: 'Light Indigo' },
    { name: 'dark-indigo', display: 'Dark Indigo' },
    { name: 'light-orange', display: 'Light Orange' },
    { name: 'dark-orange', display: 'Dark Orange' },
    { name: 'light-purple', display: 'Light Purple' },
    { name: 'dark-purple', display: 'Dark Purple' },
    { name: 'light-amber', display: 'Light Amber' },
    { name: 'dark-amber', display: 'Dark Amber' },
    { name: 'light-crimson', display: 'Light Crimson' },
    { name: 'dark-crimson', display: 'Dark Crimson' },
    { name: 'light-teal', display: 'Light Teal' },
    { name: 'dark-teal', display: 'Dark Teal' }
  ]);

  private theme = new BehaviorSubject<Theme>(this.themes.value[2]);

  themes$ = this.themes.asObservable();
  theme$ = this.theme.asObservable();

  constructor(
    private overlay: OverlayContainer
  ) {
    this.setOverlayContainerTheme(this.theme.value.name);
  }

  setTheme = (t: Theme) => {
    this.setOverlayContainerTheme(t.name, this.theme.value.name);
    this.theme.next(t);
  }

  setOverlayContainerTheme = (newTheme: string, oldTheme?: string) => {
    if (oldTheme) {
      this.overlay.getContainerElement().classList.remove(oldTheme);
    }
    this.overlay.getContainerElement().classList.add(newTheme);
  }
}
