import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddHelmetModalComponent } from './add-helmet-modal.component';

describe('AddHelmetModalComponent', () => {
  let component: AddHelmetModalComponent;
  let fixture: ComponentFixture<AddHelmetModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddHelmetModalComponent]
    });
    fixture = TestBed.createComponent(AddHelmetModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
