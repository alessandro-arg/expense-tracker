import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { ZORRO_MODULES } from './zorro-imports';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, ZORRO_MODULES],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'expense-tracker';
}
