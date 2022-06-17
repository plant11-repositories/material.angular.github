import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DatepickerSampleComponent } from './datepicker-sample.component';

describe('DatepickerSampleComponent', () => {
  let component: DatepickerSampleComponent;
  let fixture: ComponentFixture<DatepickerSampleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DatepickerSampleComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DatepickerSampleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
