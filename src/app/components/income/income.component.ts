import { Component } from '@angular/core';
import { ZORRO_MODULES } from '../../zorro-imports';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NzMessageService } from 'ng-zorro-antd/message';
import { Router, RouterModule } from '@angular/router';
import { IncomeService } from '../../services/income/income.service';
import { Timestamp } from '@angular/fire/firestore';

@Component({
  selector: 'app-income',
  standalone: true,
  imports: [RouterModule, ZORRO_MODULES, CommonModule],
  templateUrl: './income.component.html',
  styleUrl: './income.component.scss',
})
export class IncomeComponent {
  incomeForm!: FormGroup;
  incomes: any[] = [];

  listOfCategory: any[] = [
    'Salary',
    'Freelancing',
    'Investments',
    'Stocks',
    'Bitcoin',
    'Bank Transfer',
    'Other',
  ];

  constructor(
    private fb: FormBuilder,
    private message: NzMessageService,
    private router: Router,
    private incomeService: IncomeService
  ) {}

  ngOnInit() {
    this.incomeForm = this.fb.group({
      title: [null, Validators.required],
      amount: [null, [Validators.required]],
      date: [null, [Validators.required]],
      category: [null, [Validators.required]],
      description: [null, [Validators.required]],
    });

    this.loadIncomes();
  }

  submitForm() {
    const formValue = this.incomeForm.value;
    const rawAmount = ('' + formValue.amount).replace(',', '.');
    formValue.amount = Number(parseFloat(rawAmount).toFixed(2));

    if (formValue.date instanceof Date) {
      formValue.date = Timestamp.fromDate(formValue.date);
    } else {
      formValue.date = Timestamp.fromDate(new Date(formValue.date));
    }

    this.incomeService
      .postIncome(formValue)
      .then(() => {
        this.message.success('Income posted succefully', { nzDuration: 3000 });
        this.incomeForm.reset();
      })
      .catch(() => {
        this.message.error('Error while posting the income', {
          nzDuration: 3000,
        });
      });
  }

  loadIncomes() {
    this.incomeService.getAllIncomes().subscribe((data) => {
      this.incomes = data;
    });
  }

  deleteIncome(id: string) {
    this.incomeService
      .deleteIncome(id)
      .then(() => {
        this.message.success('Income deleted with success', {
          nzDuration: 3000,
        });
      })
      .catch(() => {
        this.message.error('Error while deleting income', {
          nzDuration: 3000,
        });
      });
  }
}
