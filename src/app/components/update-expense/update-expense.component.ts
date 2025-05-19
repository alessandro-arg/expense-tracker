import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
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
  expenseForm!: FormGroup;
  expenses: any[] = [];
  id: string = this.activatedRoute.snapshot.params['id'];

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
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit() {
    this.expenseForm = this.fb.group({
      title: [null, Validators.required],
      amount: [null, Validators.required],
      date: [null, Validators.required],
      category: [null, Validators.required],
      description: [null, Validators.required],
    });

    this.getExpenseById();
  }

  getExpenseById() {
    this.expenseService.getExpenseById(this.id).subscribe({
      next: (response) => {
        const patchedExpense = {
          ...response,
          date: response.date?.toDate?.() || new Date(response.date),
        };
        this.expenseForm.patchValue(patchedExpense);
      },
      error: () => {
        this.message.error('Something went wrong.', {
          nzDuration: 3000,
        });
      },
    });
  }

  submitForm() {
    const updatedExpense = this.expenseForm.value;
    this.expenseService
      .updateExpense(this.id, updatedExpense)
      .then(() => {
        this.message.success('Expense updated with success', {
          nzDuration: 3000,
        });
        this.router.navigateByUrl('/expense');
      })
      .catch(() => {
        this.message.error('Error while updating expense', {
          nzDuration: 3000,
        });
      });
  }
}
