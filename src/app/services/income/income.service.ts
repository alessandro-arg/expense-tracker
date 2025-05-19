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

  getIncomeById(id: string): Observable<any> {
    const IncomeDocRef = doc(this.firestore, 'incomes', id);
    return docData(IncomeDocRef, { idField: 'id' });
  }
}
