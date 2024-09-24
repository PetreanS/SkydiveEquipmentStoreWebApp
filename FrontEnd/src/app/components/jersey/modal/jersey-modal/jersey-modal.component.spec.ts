import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JerseyModalComponent } from './jersey-modal.component';

describe('JerseyModalComponent', () => {
  let component: JerseyModalComponent;
  let fixture: ComponentFixture<JerseyModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [JerseyModalComponent]
    });
    fixture = TestBed.createComponent(JerseyModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
