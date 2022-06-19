import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpinnerSampleComponent } from './spinner-sample.component';

describe('SpinnerSampleComponent', () => {
  let component: SpinnerSampleComponent;
  let fixture: ComponentFixture<SpinnerSampleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SpinnerSampleComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SpinnerSampleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
