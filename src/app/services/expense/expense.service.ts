import { Injectable } from '@angular/core';
import {
  Firestore,
  collection,
  addDoc,
  collectionData,
} from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ExpenseService {
  constructor(private firestore: Firestore) {}

  postExpense(expense: any): Promise<any> {
    const expensesRef = collection(this.firestore, 'expenses');
    return addDoc(expensesRef, expense);
  }

  getExpenses(): Observable<any[]> {
    const expensesRef = collection(this.firestore, 'expenses');
    return collectionData(expensesRef, { idField: 'id' });
  }
}
