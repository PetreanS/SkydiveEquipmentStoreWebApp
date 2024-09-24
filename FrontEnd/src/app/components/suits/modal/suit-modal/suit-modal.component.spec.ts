import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuitModalComponent } from './suit-modal.component';

describe('SuitModalComponent', () => {
  let component: SuitModalComponent;
  let fixture: ComponentFixture<SuitModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SuitModalComponent]
    });
    fixture = TestBed.createComponent(SuitModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
