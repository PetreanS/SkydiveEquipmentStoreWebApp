import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserOrderHistoryModalComponent } from './user-order-history-modal.component';

describe('UserOrderHistoryModalComponent', () => {
  let component: UserOrderHistoryModalComponent;
  let fixture: ComponentFixture<UserOrderHistoryModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UserOrderHistoryModalComponent]
    });
    fixture = TestBed.createComponent(UserOrderHistoryModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
