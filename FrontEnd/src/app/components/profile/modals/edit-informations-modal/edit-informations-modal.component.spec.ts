import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditInformationsModalComponent } from './edit-informations-modal.component';

describe('EditInformationsModalComponent', () => {
  let component: EditInformationsModalComponent;
  let fixture: ComponentFixture<EditInformationsModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditInformationsModalComponent]
    });
    fixture = TestBed.createComponent(EditInformationsModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
