import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddSuitModalComponent } from './add-suit-modal.component';

describe('AddSuitModalComponent', () => {
  let component: AddSuitModalComponent;
  let fixture: ComponentFixture<AddSuitModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddSuitModalComponent]
    });
    fixture = TestBed.createComponent(AddSuitModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
