import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ContactService } from './service/contact.service';
import { Contact } from './models/contact.model';
import { MatDialog } from '@angular/material/dialog';
import { ContactModalComponent } from './modal/contact-modal/contact-modal.component';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css'],
})
export class ContactComponent {
  contactForm: FormGroup;

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private contactService: ContactService,
    private dialog: MatDialog
  ) {
    this.contactForm = this.formBuilder.group({
      Name: [''],
      Email: [''],
      PhoneNumber: [''],
      Subject: [''],
      Message: [''],
    });
  }

  onSubmit() {
    if (this.contactForm.valid) {
      const contact = new Contact(
        this.contactForm.value.Name,
        this.contactForm.value.Email,
        this.contactForm.value.PhoneNumber,
        this.contactForm.value.Subject,
        this.contactForm.value.Message
      );
      this.contactService.processContactRequest(contact).subscribe();
      const dialogRef = this.dialog.open(ContactModalComponent, {
        width: '400px',
        disableClose: true
      });
  
      dialogRef.afterClosed().subscribe(() => {
        this.router.navigate(['/main']);
      });
    } 
  }
  
}
