import { Theme } from './models';
import { Subscription } from 'rxjs';

import {
  Component,
  OnInit,
  OnDestroy
} from '@angular/core';

import { ThemeService } from './services';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent implements OnInit, OnDestroy {
  private themeSub: Subscription;

  themeClass = 'default';

  constructor(
    public theme: ThemeService
  ) { }

  ngOnInit() {
    this.themeSub = this.theme.theme$.subscribe((t: Theme) => this.themeClass = t.name);
  }

  ngOnDestroy() {
    this.themeSub && this.themeSub.unsubscribe();
  }
}
