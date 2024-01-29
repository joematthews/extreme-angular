import { UpperCasePipe } from '@angular/common';
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, MatButtonModule, UpperCasePipe],
  template: `
    <h1 i18n>Hello, {{ title }}!</h1>
    <p i18n>
      The theme colors are:&nbsp;
      @for (color of colors; track color; let index = $index) {
        <button
          mat-raised-button
          type="button"
          [color]="color === 'none' ? '' : color"
        >
          {{ color | uppercase }} {{ index }}
        </button>
        @if (index < colors.length - 1) {
          &nbsp;
        }
      }
    </p>
    <router-outlet />
  `,
  styles: ``,
})
export class AppComponent {
  title = 'opinionated-angular';

  colors = ['none', 'primary', 'accent', 'warn'];
}
