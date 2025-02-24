import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-quotation-form',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './quotation-form.component.html',
  styleUrl: './quotation-form.component.css'
})
export class QuotationFormComponent implements OnInit {
  quoteForm!: FormGroup;
  minDate!: string;
  constructor(private fb: FormBuilder,
              private router: Router
  ) {}
  ngOnInit(): void {
    this.minDate = this.getTodayDate();

    this.quoteForm = this.fb.group({
      clientName: ['', Validators.required],
      validUntil: ['', Validators.required],
      description: [''],
      items: this.fb.array([this.createItem()]) 
    });

 
  this.items.controls.forEach((item, index) => {
    this.setupAmountCalculation(item as FormGroup);
  });

  }

  getTodayDate(): string {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0'); 
    const day = String(today.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

setupAmountCalculation(item: FormGroup): void {
  item.get('quantity')?.valueChanges.subscribe(() => this.calculateAmount(item));
  item.get('unitPrice')?.valueChanges.subscribe(() => this.calculateAmount(item));
}


calculateAmount(item: FormGroup): void {
  const quantity = item.get('quantity')?.value;
  const unitPrice = item.get('unitPrice')?.value;
  const amount = quantity * unitPrice;
  item.get('amount')?.setValue(amount, { emitEvent: false }); 
}


  createItem(): FormGroup {
    return this.fb.group({
      description: ['', Validators.required],
      quantity: [1, [Validators.required, Validators.min(1)]],
      unitPrice: [0, [Validators.required, Validators.min(0)]],
      amount: [{ value: 0, disabled: true }]
    });
  }
  get items(): FormArray {
    return this.quoteForm.get('items') as FormArray;
  }

  addItem(): void {
    const newItem = this.createItem();
    this.items.push(newItem);
    this.setupAmountCalculation(newItem);
  }
  
  removeItem(index: number): void {
    this.items.removeAt(index);
  }

  calculateTotalAmount(): number {
    return this.items.controls.reduce((total, item) => {
      const quantity = item.get('quantity')?.value;
      const unitPrice = item.get('unitPrice')?.value;
      return total + (quantity * unitPrice);
    }, 0);
  }

  onSubmit(): void {
    if (this.quoteForm.valid) {
      const state = { quote: this.quoteForm.value }; 
      this.router.navigate(['/quotes-details'], { state });
    } else {
      console.log('Form is invalid');
    }
  }
  

}
