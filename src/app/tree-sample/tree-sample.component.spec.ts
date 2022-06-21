import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TreeSampleComponent } from './tree-sample.component';

describe('TreeSampleComponent', () => {
  let component: TreeSampleComponent;
  let fixture: ComponentFixture<TreeSampleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TreeSampleComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TreeSampleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
