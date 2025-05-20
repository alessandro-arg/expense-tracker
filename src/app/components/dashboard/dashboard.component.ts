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

  @ViewChild('incomeLineChartRef') private incomeLineChartRef: ElementRef;
  @ViewChild('expenseLineChartRef') private expenseLineChartRef: ElementRef;

  constructor(private statsService: StatsService) {
    this.getStats();
    this.getChartData();
  }

  createLineChart() {
    const incomeCtx = this.incomeLineChartRef.nativeElement.getContext('2d');

    new Chart(incomeCtx, {
      type: 'line',
      data: {
        labels: this.incomes.map((income: { date: any }) =>
          this.formatDate(income.date)
        ),
        datasets: [
          {
            label: 'Income',
            data: this.incomes.map((income: { amount: any }) => income.amount),
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

    const expenseCtx = this.expenseLineChartRef.nativeElement.getContext('2d');

    new Chart(expenseCtx, {
      type: 'line',
      data: {
        labels: this.expenses.map((expense: { date: any }) =>
          this.formatDate(expense.date)
        ),
        datasets: [
          {
            label: 'Expense',
            data: this.expenses.map(
              (expense: { amount: any }) => expense.amount
            ),
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

  formatDate(date: any): string {
    const jsDate = date?.toDate ? date.toDate() : new Date(date);
    const day = String(jsDate.getDate()).padStart(2, '0');
    const month = String(jsDate.getMonth() + 1).padStart(2, '0');
    const year = jsDate.getFullYear();
    return `${day}-${month}-${year}`;
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
