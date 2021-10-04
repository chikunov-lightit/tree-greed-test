import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TreeGridSecondComponent } from './tree-grid-second.component';

describe('TreeGridSecondComponent', () => {
  let component: TreeGridSecondComponent;
  let fixture: ComponentFixture<TreeGridSecondComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TreeGridSecondComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TreeGridSecondComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
