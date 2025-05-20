import { Component, ElementRef, ViewChild } from '@angular/core';
import { ZORRO_MODULES } from '../../zorro-imports';
import { CommonModule } from '@angular/common';
import { StatsService } from '../../services/stats/stats.service';
import { CategoryScale } from 'chart.js';
import Chart from 'chart.js/auto';

Chart.register(CategoryScale);

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

  @ViewChild('myChart') private chartRef: ElementRef;

  constructor(private statsService: StatsService) {
    this.getStats();
    this.getChartData();
  }

  createLineChart() {
    const ctx = this.chartRef.nativeElement.getContext('2d');

    new Chart(ctx, {
      type: 'bar',
      data: {
        labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
        datasets: [
          {
            label: '# of Votes',
            data: [12, 19, 3, 5, 2, 3],
            borderWidth: 1,
          },
        ],
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    });
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

        this.createLineChart();
      }
    });
  }
}
