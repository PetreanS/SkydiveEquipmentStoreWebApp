import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ProfileService } from '../../service/profile.service';
import { EditUserDTO } from 'src/app/DTO/editUser.dto';
import { AuthService } from 'src/app/auth.service';

@Component({
  selector: 'app-edit-informations-modal',
  templateUrl: './edit-informations-modal.component.html',
  styleUrls: ['./edit-informations-modal.component.css'],
})
export class EditInformationsModalComponent {
  editedUser: EditUserDTO;
  formattedDateOfBirth: string;

  constructor(
    public dialogRef: MatDialogRef<EditInformationsModalComponent>,
    private authService: AuthService,
    @Inject(MAT_DIALOG_DATA) public data: { user: any },
    private profileService: ProfileService
  ) {
    this.editedUser = new EditUserDTO(data.user);
    this.formattedDateOfBirth = this.formatDate(this.editedUser.dateOfBirth);
  }

  onSave(): void {
    const userToSave: EditUserDTO = {
      ...this.editedUser,
      dateOfBirth: new Date(this.editedUser.dateOfBirth).toISOString(),
    };

    this.profileService.editUserInformations(userToSave).subscribe({
      next: () => {
        console.log('User information updated successfully.');
        this.authService.setUser({ ...this.authService.getUser(), ...userToSave }); 
        this.dialogRef.close({ updatedUser: userToSave });
        window.location.reload();

      },
      error: (error: any) => {
        console.error('Failed to update user information:', error);
      }
    });
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  formatDate(date: any): string {
    if (!date) return '';
    if (typeof date === 'string') {
      date = new Date(date);
    }
    if (!(date instanceof Date) || isNaN(date.getTime())) {
      return '';
    }
    const year = date.getFullYear();
    let month: string | number = date.getMonth() + 1;
    let day: string | number = date.getDate();
    if (month < 10) month = '0' + month;
    if (day < 10) day = '0' + day;
    return `${year}-${month}-${day}`;
  }
}
