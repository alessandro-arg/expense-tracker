import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';
import { ExpenseService } from '../../services/expense/expense.service';
import { ZORRO_MODULES } from '../../zorro-imports';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-update-expense',
  standalone: true,
  imports: [ZORRO_MODULES, CommonModule],
  templateUrl: './update-expense.component.html',
  styleUrl: './update-expense.component.scss',
})
export class UpdateExpenseComponent {
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
  }

  submitForm() {}
}
