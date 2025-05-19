import { Component } from '@angular/core';
import { ZORRO_MODULES } from '../../zorro-imports';
import { CommonModule } from '@angular/common';
import { StatsService } from '../../services/stats/stats.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [ZORRO_MODULES, CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent {
  constructor(private statsService: StatsService) {
    this.getStats();
  }

  getStats() {
    this.statsService.getStats().subscribe((stats) => {
      console.log('Stats:', stats);
    });
  }
}
