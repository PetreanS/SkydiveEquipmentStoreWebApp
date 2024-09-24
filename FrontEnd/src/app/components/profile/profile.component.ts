import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth.service';
import { Router } from '@angular/router';
import { ProfileService } from './service/profile.service';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { AddSuitModalComponent } from '../modals/add-product-modal/add-suit-modal/add-suit-modal.component';
import { AddJerseyModalComponent } from '../modals/add-product-modal/add-jersey-modal/add-jersey-modal.component';
import { AddHelmetModalComponent } from '../modals/add-product-modal/add-helmet-modal/add-helmet-modal.component';
import { EditInformationsModalComponent } from './modals/edit-informations-modal/edit-informations-modal.component';
import { User } from './models/user';
import { DatePipe } from '@angular/common';
import { UserOrderHistoryModalComponent } from './modals/user-order-history-modal/user-order-history-modal.component';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
  providers: [DatePipe]
})
export class ProfileComponent implements OnInit {
  user = this.authService.getUser();
  selectedFile: File | null = null;
  selectedFileUrl: string | null = null;
  isDropdownOpen: boolean = false;

  constructor(
    private authService: AuthService,
    private router: Router,
    private profileService: ProfileService,
    private dialog: MatDialog,
    private datePipe: DatePipe
  ) {}

  ngOnInit() {
    this.user = this.authService.getUser();
    this.getProfilePicture();
  }
  toggleDropdown() {
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  addSuitOption() {
    this.dialog.open(AddSuitModalComponent);
  }

  addJerseyOption() {
    this.dialog.open(AddJerseyModalComponent);
  }

  addHelmetOption() {
    this.dialog.open(AddHelmetModalComponent);
  }

  formatDateOfBirth(dateOfBirth: Date | null): string {
    if (!dateOfBirth) {
      return '';
    }
    return this.datePipe.transform(dateOfBirth, 'dd/MM/yyyy') || '';
  }

  getProfilePicture() {
    this.profileService.getProfilePictureUrl(this.user.id).subscribe({
      next: (response) => {
        console.log('Response:', response);

        if (response && response.profilePictureUrl) {
          this.selectedFileUrl = response.profilePictureUrl;
        }
      },
      error: (error) => {
        console.error('Error:', error);
      },
    });
  }

  onFileSelected(event: any) {
    const file = event.target.files?.[0];
    if (file) {
      this.selectedFile = file;

      const reader = new FileReader();
      reader.onload = (e) => {
        this.selectedFileUrl = e.target?.result as string;
      };
      reader.readAsDataURL(file);

      this.uploadProfilePicture();
    }
  }

  uploadProfilePicture() {
    if (this.selectedFile) {
      this.profileService
        .uploadProfilePicture(this.user.id, this.selectedFile)
        .subscribe({
          next: (response) => {
            console.log(response.message);
          },
          error: (error) => {
            console.error(error);
          },
        });
    }
  }

  openFileInput() {
    const fileInput = document.getElementById('fileInput');
    if (fileInput) {
      fileInput.click();
    }
  }

  logOut() {
    this.authService.resetUser();
    this.router.navigate(['/main']);
  }

  editDetails() {
    this.dialog.open(EditInformationsModalComponent, {
      data: { user: this.user },
    });
  }

  openOrderHistory(){
    this.dialog.open(UserOrderHistoryModalComponent)
  }
}