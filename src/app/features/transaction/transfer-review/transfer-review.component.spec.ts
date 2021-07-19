import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TransferReviewComponent } from './transfer-review.component';

describe('TransferReviewComponent', () => {
  let component: TransferReviewComponent;
  let fixture: ComponentFixture<TransferReviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TransferReviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TransferReviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
