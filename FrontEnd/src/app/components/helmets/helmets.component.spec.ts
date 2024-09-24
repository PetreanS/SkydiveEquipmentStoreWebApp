import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HelmetsComponent } from './helmets.component';

describe('HelmetsComponent', () => {
  let component: HelmetsComponent;
  let fixture: ComponentFixture<HelmetsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HelmetsComponent]
    });
    fixture = TestBed.createComponent(HelmetsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
