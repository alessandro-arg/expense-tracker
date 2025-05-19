import { Component } from '@angular/core';
import { ZORRO_MODULES } from '../../zorro-imports';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NzMessageService } from 'ng-zorro-antd/message';
import { Router } from '@angular/router';

@Component({
  selector: 'app-income',
  standalone: true,
  imports: [ZORRO_MODULES, CommonModule],
  templateUrl: './income.component.html',
  styleUrl: './income.component.scss',
})
export class IncomeComponent {
  incomeForm!: FormGroup;
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
    private router: Router
  ) {}

  ngOnInit() {
    this.incomeForm = this.fb.group({
      title: [null, Validators.required],
      amount: [null, [Validators.required]],
      date: [null, [Validators.required]],
      category: [null, [Validators.required]],
      description: [null, [Validators.required]],
    });
  }
}
