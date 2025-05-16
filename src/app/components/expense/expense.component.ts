import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ZORRO_MODULES } from '../../zorro-imports';

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

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.expenseFrom = this.fb.group({
      title: [null, Validators.required],
      amount: [null, Validators.required],
      date: [null, Validators.required],
      category: [null, Validators.required],
      description: [null, Validators.required],
    });
  }
}
