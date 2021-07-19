import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TextPrefixInputComponent } from './text-prefix-input.component';

describe('TextPrefixInputComponent', () => {
  let component: TextPrefixInputComponent;
  let fixture: ComponentFixture<TextPrefixInputComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TextPrefixInputComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TextPrefixInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
