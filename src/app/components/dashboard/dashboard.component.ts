import {
  Component,
  ElementRef,
  ViewChild,
  AfterViewInit,
  OnDestroy,
} from '@angular/core';
import { ZORRO_MODULES } from '../../zorro-imports';
import { CommonModule } from '@angular/common';
import { StatsService } from '../../services/stats/stats.service';
import { CategoryScale } from 'chart.js';
import Chart from 'chart.js/auto';

Chart.register(CategoryScale);

type Tx = { date: any; amount: number; title: string };

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [ZORRO_MODULES, CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent implements AfterViewInit, OnDestroy {
  stats: any;
  expenses: Tx[] = [];
  incomes: Tx[] = [];

  incomeChart: Chart<'line', number[], string> | null = null;
  expenseChart: Chart<'line', number[], string> | null = null;

  @ViewChild('incomeLineChartRef', { static: false })
  private incomeLineChartRef!: ElementRef<HTMLCanvasElement>;
  @ViewChild('expenseLineChartRef', { static: false })
  private expenseLineChartRef!: ElementRef<HTMLCanvasElement>;
  private ro?: ResizeObserver;

  constructor(private statsService: StatsService) {
    this.getStats();
    this.getChartData();
  }

  ngAfterViewInit(): void {
    this.ro = new ResizeObserver(() => this.redrawCharts());
    setTimeout(() => {
      const incomeCanvasParent =
        this.incomeLineChartRef?.nativeElement?.parentElement;
      const expenseCanvasParent =
        this.expenseLineChartRef?.nativeElement?.parentElement;
      if (incomeCanvasParent) this.ro?.observe(incomeCanvasParent);
      if (expenseCanvasParent) this.ro?.observe(expenseCanvasParent);
    });
  }

  ngOnDestroy(): void {
    this.destroyCharts();
    this.ro?.disconnect();
  }

  private destroyCharts() {
    if (this.incomeChart) {
      this.incomeChart.destroy();
      this.incomeChart = null;
    }
    if (this.expenseChart) {
      this.expenseChart.destroy();
      this.expenseChart = null;
    }
  }

  private redrawCharts() {
    if (this.incomes.length && this.expenses.length) {
      this.createLineCharts();
    }
  }

  private createLineCharts() {
    this.destroyCharts();

    if (
      !this.incomeLineChartRef?.nativeElement ||
      !this.expenseLineChartRef?.nativeElement
    ) {
      return;
    }

    this.incomeChart = new Chart<'line', number[], string>(
      this.incomeLineChartRef.nativeElement,
      {
        type: 'line',
        data: {
          labels: this.incomes.map((i) => this.formatDate(i.date)),
          datasets: [
            {
              label: 'Income',
              data: this.incomes.map((i) => i.amount), // numbers only
              borderColor: '#00e5ff',
              backgroundColor: 'rgba(0, 229, 255, 0.15)',
              tension: 0.35,
              fill: true,
              pointRadius: 4,
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
                label: (ctx: any) => {
                  const item = this.incomes[ctx.dataIndex];
                  return [`${item.amount} €`, item.title];
                },
              },
            },
            legend: {
              labels: { color: '#a5b4fc', font: { size: 13, weight: 'bold' } },
            },
          },
          scales: {
            y: {
              beginAtZero: true,
              ticks: { callback: (v: number) => `${v} €` },
              grid: { color: 'rgba(255,255,255,.08)' },
            },
            x: {
              ticks: { autoSkip: true, maxRotation: 0 },
              grid: { display: false },
            },
          },
        },
      }
    );

    this.expenseChart = new Chart<'line', number[], string>(
      this.expenseLineChartRef.nativeElement,
      {
        type: 'line',
        data: {
          labels: this.expenses.map((e) => this.formatDate(e.date)),
          datasets: [
            {
              label: 'Expense',
              data: this.expenses.map((e) => e.amount), // numbers only
              borderColor: '#ef5350',
              backgroundColor: 'rgba(239, 83, 80, 0.15)',
              tension: 0.35,
              fill: true,
              pointRadius: 4,
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
                label: (ctx: any) => {
                  const item = this.expenses[ctx.dataIndex];
                  return [`${item.amount} €`, item.title];
                },
              },
            },
            legend: {
              labels: { color: '#ffab91', font: { size: 13, weight: 'bold' } },
            },
          },
          scales: {
            y: {
              beginAtZero: true,
              ticks: { callback: (v: number) => `${v} €` },
              grid: { color: 'rgba(255,255,255,.08)' },
            },
            x: {
              ticks: { autoSkip: true, maxRotation: 0 },
              grid: { display: false },
            },
          },
        },
      }
    );
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
      if (stats?.expenseList && stats?.incomeList) {
        this.incomes = stats.incomeList;
        this.expenses = stats.expenseList;
        setTimeout(() => this.createLineCharts());
      }
    });
  }
}
