import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JerseyComponent } from './jersey.component';

describe('JerseyComponent', () => {
  let component: JerseyComponent;
  let fixture: ComponentFixture<JerseyComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [JerseyComponent]
    });
    fixture = TestBed.createComponent(JerseyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
