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
    const incomeRef = collection(this.firestore, 'income');
    return addDoc(incomeRef, income);
  }
}
