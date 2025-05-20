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
  stats: any;

  expenses: any;
  incomes: any;

  gridStyle = {
    width: '25%',
    textAlign: 'center',
  };

  constructor(private statsService: StatsService) {
    this.getStats();
    this.getChartData();
  }

  getStats() {
    this.statsService.getStats().subscribe((stats) => {
      console.log('Stats:', stats);
      this.stats = stats;
    });
  }

  getChartData() {
    this.statsService.getChart().subscribe((stats) => {
      if (stats.expenseList != null && stats.incomeList != null) {
        this.incomes = stats.incomeList;
        this.expenses = stats.expenseList;
        console.log(stats);
      }
    });
  }
}
