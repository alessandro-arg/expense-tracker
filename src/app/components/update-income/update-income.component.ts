import { Component } from '@angular/core';
import { ZORRO_MODULES } from '../../zorro-imports';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';
import { IncomeService } from '../../services/income/income.service';

@Component({
  selector: 'app-update-income',
  standalone: true,
  imports: [ZORRO_MODULES, CommonModule],
  templateUrl: './update-income.component.html',
  styleUrl: './update-income.component.scss',
})
export class UpdateIncomeComponent {
  incomeForm!: FormGroup;
  incomes: any[] = [];
  id: string = this.activatedRoute.snapshot.params['id'];

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
    private incomeService: IncomeService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit() {
    this.incomeForm = this.fb.group({
      title: [null, Validators.required],
      amount: [null, [Validators.required]],
      date: [null, [Validators.required]],
      category: [null, [Validators.required]],
      description: [null, [Validators.required]],
    });

    this.getExpenseById();
  }

  getExpenseById() {
    this.incomeService.getIncomeById(this.id).subscribe({
      next: (response) => {
        const patchedIncome = {
          ...response,
          date: response.date?.toDate?.() || new Date(response.date),
        };
        this.incomeForm.patchValue(patchedIncome);
      },
      error: () => {
        this.message.error('Something went wrong.', {
          nzDuration: 3000,
        });
      },
    });
  }

  submitForm() {
    const updatedIncome = this.incomeForm.value;
    this.incomeService
      .updateIncome(this.id, updatedIncome)
      .then(() => {
        this.message.success('Income updated with success', {
          nzDuration: 3000,
        });
        this.router.navigateByUrl('/income');
      })
      .catch(() => {
        this.message.error('Error while updating income', {
          nzDuration: 3000,
        });
      });
  }
}
