import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TreeGridTreeComponent } from './tree-grid-tree.component';

describe('TreeGridTreeComponent', () => {
  let component: TreeGridTreeComponent;
  let fixture: ComponentFixture<TreeGridTreeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TreeGridTreeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TreeGridTreeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
