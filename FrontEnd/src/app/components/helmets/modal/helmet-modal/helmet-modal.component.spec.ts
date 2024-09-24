import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HelmetModalComponent } from './helmet-modal.component';

describe('HelmetModalComponent', () => {
  let component: HelmetModalComponent;
  let fixture: ComponentFixture<HelmetModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HelmetModalComponent]
    });
    fixture = TestBed.createComponent(HelmetModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
