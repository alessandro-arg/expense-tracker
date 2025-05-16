import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ZORRO_MODULES } from '../../zorro-imports';
import { ExpenseService } from '../../services/expense/expense.service';
import { NzMessageService } from 'ng-zorro-antd/message';

@Component({
  selector: 'app-expense',
  standalone: true,
  imports: [RouterModule, ZORRO_MODULES],
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
    this.expenseService.postExpense(this.expenseFrom.value).subscribe(
      (res) => {
        this.message.success('Expense created succesfully', {
          nzDuration: 5000,
        });
      },
      (error) => {
        this.message.error('Error while posting expense', { nzDuration: 5000 });
      }
    );
  }
}
