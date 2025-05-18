import { Injectable } from '@angular/core';
import {
  Firestore,
  collection,
  addDoc,
  collectionData,
  docData,
} from '@angular/fire/firestore';
import { doc, deleteDoc } from 'firebase/firestore';
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

  getAllExpenses(): Observable<any[]> {
    const expensesRef = collection(this.firestore, 'expenses');
    return collectionData(expensesRef, { idField: 'id' });
  }

  deleteExpense(id: string): Promise<any> {
    const expenseDocRef = doc(this.firestore, 'expenses', id);
    return deleteDoc(expenseDocRef);
  }

  getExpenseById(id: string): Observable<any> {
    const expenseDocRef = doc(this.firestore, 'expenses', id);
    return docData(expenseDocRef, { idField: 'id' });
  }
}
