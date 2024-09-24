import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddJerseyModalComponent } from './add-jersey-modal.component';

describe('AddJerseyModalComponent', () => {
  let component: AddJerseyModalComponent;
  let fixture: ComponentFixture<AddJerseyModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddJerseyModalComponent]
    });
    fixture = TestBed.createComponent(AddJerseyModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
