import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TreeGridFourComponent } from './tree-grid-four.component';

describe('TreeGridFourComponent', () => {
  let component: TreeGridFourComponent;
  let fixture: ComponentFixture<TreeGridFourComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TreeGridFourComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TreeGridFourComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
