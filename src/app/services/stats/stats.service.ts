import { Injectable } from '@angular/core';
import {
  Firestore,
  collection,
  collectionData,
  query,
  orderBy,
} from '@angular/fire/firestore';
import { Observable, combineLatest, map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class StatsService {
  constructor(private firestore: Firestore) {}

  getStats(): Observable<any> {
    const expensesRef = query(
      collection(this.firestore, 'expenses'),
      orderBy('date', 'desc')
    );
    const incomesRef = query(
      collection(this.firestore, 'incomes'),
      orderBy('date', 'desc')
    );

    const expenses$ = collectionData(expensesRef, { idField: 'id' });
    const incomes$ = collectionData(incomesRef, { idField: 'id' });

    return combineLatest([expenses$, incomes$]).pipe(
      map(([expenses, incomes]) => this.calculateStats(expenses, incomes))
    );
  }

  private calculateStats(expenses: any[], incomes: any[]) {
    return {
      balance: this.getBalance(expenses, incomes),
      expense: this.getTotal(expenses),
      income: this.getTotal(incomes),
      lastExpense: this.getLastItem(expenses),
      lastIncome: this.getLastItem(incomes),
      maxExpense: this.getMax(expenses),
      maxIncome: this.getMax(incomes),
      minExpense: this.getMin(expenses),
      minIncome: this.getMin(incomes),
    };
  }

  private getTotal(items: any[]): number {
    return items.reduce((sum, item) => sum + (item.amount || 0), 0);
  }

  private getLastItem(items: any[]): any | null {
    return items[0] || null;
  }

  private getMax(items: any[]): number {
    const amounts = items.map((item) => item.amount || 0);
    return amounts.length ? Math.max(...amounts) : 0;
  }

  private getMin(items: any[]): number {
    const amounts = items.map((item) => item.amount || 0);
    return amounts.length ? Math.min(...amounts) : 0;
  }

  private getBalance(expenses: any[], incomes: any[]): number {
    return this.getTotal(incomes) - this.getTotal(expenses);
  }
}
