import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterOutlet } from '@angular/router';
import { ZORRO_MODULES } from './zorro-imports';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink, ZORRO_MODULES],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  isCollapsed = false;
  title = 'expense-tracker';

  toggleMenu() {
    this.isCollapsed = !this.isCollapsed;
  }
}
