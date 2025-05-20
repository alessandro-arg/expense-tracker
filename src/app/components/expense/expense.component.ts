import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { ZORRO_MODULES } from '../../zorro-imports';
import { ExpenseService } from '../../services/expense/expense.service';
import { NzMessageService } from 'ng-zorro-antd/message';
import { CommonModule } from '@angular/common';
import { Timestamp } from '@angular/fire/firestore';

@Component({
  selector: 'app-expense',
  standalone: true,
  imports: [RouterModule, CommonModule, ZORRO_MODULES],
  templateUrl: './expense.component.html',
  styleUrl: './expense.component.scss',
})
export class ExpenseComponent {
  expenseFrom!: FormGroup;
  expenses: any[] = [];

  listOfCategory: any[] = [
    'Education',
    'Groceries',
    'Health',
    'Subscriptions',
    'Takeaways',
    'Clothing',
    'Traveling',
    'Other',
  ];

  constructor(
    private fb: FormBuilder,
    private expenseService: ExpenseService,
    private message: NzMessageService,
    private router: Router
  ) {}

  ngOnInit() {
    this.expenseFrom = this.fb.group({
      title: [null, Validators.required],
      amount: [null, Validators.required],
      date: [null, Validators.required],
      category: [null, Validators.required],
      description: [null, Validators.required],
    });

    this.loadExpenses();
  }

  submitForm() {
    const formValue = this.expenseFrom.value;
    const rawAmount = ('' + formValue.amount).replace(',', '.');
    formValue.amount = Number(parseFloat(rawAmount).toFixed(2));

    if (formValue.date instanceof Date) {
      formValue.date = Timestamp.fromDate(formValue.date);
    } else {
      formValue.date = Timestamp.fromDate(new Date(formValue.date));
    }

    this.expenseService
      .postExpense(formValue)
      .then(() => {
        this.message.success('Expense created successfully', {
          nzDuration: 3000,
        });
        this.expenseFrom.reset();
      })
      .catch(() => {
        this.message.error('Error while posting expense', {
          nzDuration: 3000,
        });
      });
  }

  loadExpenses() {
    this.expenseService.getAllExpenses().subscribe((data) => {
      this.expenses = data;
    });
  }

  updateExpense(id: string) {
    this.router.navigateByUrl(`/expense/${id}/edit`);
  }

  deleteExpense(id: string) {
    this.expenseService
      .deleteExpense(id)
      .then(() => {
        this.message.success('Expense deleted with success', {
          nzDuration: 3000,
        });
      })
      .catch(() => {
        this.message.error('Error while deleting expense', {
          nzDuration: 3000,
        });
      });
  }
}
