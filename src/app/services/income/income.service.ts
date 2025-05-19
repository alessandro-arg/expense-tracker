import { Injectable } from '@angular/core';
import {
  Firestore,
  collection,
  addDoc,
  collectionData,
  docData,
} from '@angular/fire/firestore';
import { doc, deleteDoc, updateDoc } from 'firebase/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class IncomeService {
  constructor(private firestore: Firestore) {}

  postIncome(income: any): Promise<any> {
    const incomesRef = collection(this.firestore, 'incomes');
    return addDoc(incomesRef, income);
  }

  getAllIncomes(): Observable<any[]> {
    const incomesRef = collection(this.firestore, 'incomes');
    return collectionData(incomesRef, { idField: 'id' });
  }

  deleteIncome(id: string): Promise<any> {
    const incomeDocRef = doc(this.firestore, 'incomes', id);
    return deleteDoc(incomeDocRef);
  }

  getIncomeById(id: string): Observable<any> {
    const IncomeDocRef = doc(this.firestore, 'incomes', id);
    return docData(IncomeDocRef, { idField: 'id' });
  }

  updateIncome(id: string, incomeData: any): Promise<void> {
    const incomeDocRef = doc(this.firestore, 'incomes', id);
    return updateDoc(incomeDocRef, incomeData);
  }
}
