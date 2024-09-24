import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-contact-modal',
  templateUrl: './contact-modal.component.html',
  styleUrls: ['./contact-modal.component.css'],
})
export class ContactModalComponent implements OnInit {
  constructor(
    private router: Router,
    public dialogRef: MatDialogRef<ContactModalComponent>
  ) {}

  ngOnInit(): void {
    setTimeout(() => {
      this.closeModalAndRedirect();
    }, 4000);
  }

  closeModalAndRedirect(): void {
    this.dialogRef.close();
    this.router.navigate(['/main']);
  }
}
