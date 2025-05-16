import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ZORRO_MODULES } from '../../zorro-imports';
import { ExpenseService } from '../../services/expense/expense.service';
import { NzMessageService } from 'ng-zorro-antd/message';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-expense',
  standalone: true,
  imports: [RouterModule, CommonModule, ZORRO_MODULES],
  templateUrl: './expense.component.html',
  styleUrl: './expense.component.scss',
})
export class ExpenseComponent {
  expenseFrom!: FormGroup;
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
    private message: NzMessageService
  ) {}

  ngOnInit() {
    this.expenseFrom = this.fb.group({
      title: [null, Validators.required],
      amount: [null, Validators.required],
      date: [null, Validators.required],
      category: [null, Validators.required],
      description: [null, Validators.required],
    });
  }

  submitForm() {
    if (this.expenseFrom.invalid) return;

    this.expenseService
      .postExpense(this.expenseFrom.value)
      .then(() => {
        this.message.success('Expense created successfully', {
          nzDuration: 5000,
        });
        this.expenseFrom.reset();
      })
      .catch(() => {
        this.message.error('Error while posting expense', {
          nzDuration: 5000,
        });
      });
  }
}
