import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuotesDetailsComponent } from './quotes-details.component';

describe('QuotesDetailsComponent', () => {
  let component: QuotesDetailsComponent;
  let fixture: ComponentFixture<QuotesDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [QuotesDetailsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QuotesDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
