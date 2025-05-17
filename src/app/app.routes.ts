import { Routes } from '@angular/router';
import { ExpenseComponent } from './components/expense/expense.component';
import { UpdateExpenseComponent } from './components/update-expense/update-expense.component';

export const routes: Routes = [
  { path: 'expense', component: ExpenseComponent },
  { path: 'expense/:id/edit', component: UpdateExpenseComponent },
];
