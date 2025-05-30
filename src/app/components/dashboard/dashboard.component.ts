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

  incomeChart: Chart | null = null;
  expenseChart: Chart | null = null;

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

  ngOnDestroy(): void {
    if (this.incomeChart) this.incomeChart.destroy();
    if (this.expenseChart) this.expenseChart.destroy();
  }

  createLineChart() {
    if (this.incomeChart) {
      this.incomeChart.destroy();
    }
    if (this.expenseChart) {
      this.expenseChart.destroy();
    }

    const incomeCtx = this.incomeLineChartRef.nativeElement.getContext('2d');
    this.incomeChart = new Chart(incomeCtx, {
      type: 'line',
      data: {
        labels: this.incomes.map((income: { date: any }) =>
          this.formatDate(income.date)
        ),
        datasets: [
          {
            label: 'Income',
            data: this.incomes.map((income: any) => ({
              x: this.formatDate(income.date),
              y: income.amount,
              title: income.title,
            })),
            borderColor: '#4caf50',
            backgroundColor: 'rgba(76, 175, 80, 0.1)',
            tension: 0.4,
            fill: true,
            pointRadius: 5,
            pointHoverRadius: 6,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          tooltip: {
            callbacks: {
              label: function (context: any) {
                const point = context.raw;
                return [`${point.y} €`, `${point.title}`];
              },
            },
          },
          legend: {
            labels: {
              color: '#4caf50',
              font: {
                size: 14,
                weight: 'bold',
              },
            },
          },
        },
        scales: {
          y: {
            beginAtZero: true,
            ticks: {
              callback: (value) => `${value} €`,
            },
          },
          x: {
            ticks: {
              autoSkip: true,
              maxRotation: 45,
              minRotation: 0,
            },
          },
        },
      },
    });

    const expenseCtx = this.expenseLineChartRef.nativeElement.getContext('2d');
    this.expenseChart = new Chart(expenseCtx, {
      type: 'line',
      data: {
        labels: this.expenses.map((expense: { date: any }) =>
          this.formatDate(expense.date)
        ),
        datasets: [
          {
            label: 'Expense',
            data: this.expenses.map(
              (expense: { amount: any; date: any; title: string }) => ({
                x: this.formatDate(expense.date),
                y: expense.amount,
                title: expense.title,
              })
            ),
            borderColor: '#f44336',
            backgroundColor: 'rgba(244, 67, 54, 0.1)',
            tension: 0.4,
            fill: true,
            pointRadius: 5,
            pointHoverRadius: 6,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          tooltip: {
            callbacks: {
              label: function (context: any) {
                const point = context.raw;
                return [`${point.y} €`, `${point.title}`];
              },
            },
          },
          legend: {
            labels: {
              color: '#f44336',
              font: {
                size: 14,
                weight: 'bold',
              },
            },
          },
        },
        scales: {
          y: {
            beginAtZero: true,
            ticks: {
              callback: (value) => `${value} €`,
            },
          },
          x: {
            ticks: {
              autoSkip: true,
              maxRotation: 45,
              minRotation: 0,
            },
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
    return `${day}.${month}.${year}`;
  }

  getStats() {
    this.statsService.getStats().subscribe((stats) => {
      this.stats = stats;
    });
  }

  getChartData() {
    this.statsService.getChart().subscribe((stats) => {
      if (stats.expenseList != null && stats.incomeList != null) {
        this.incomes = stats.incomeList;
        this.expenses = stats.expenseList;

        this.createLineChart();
      }
    });
  }
}
