import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompoundInputComponent } from './compound-input.component';

describe('CompoundInputComponent', () => {
  let component: CompoundInputComponent;
  let fixture: ComponentFixture<CompoundInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CompoundInputComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CompoundInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
