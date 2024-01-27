import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, MatButtonModule],
  template: `
    <h1 i18n>Hello, {{ title }}!</h1>
    <router-outlet />
  `,
  styles: ``,
})
export class AppComponent {
  title = 'opinionated-angular';
}
