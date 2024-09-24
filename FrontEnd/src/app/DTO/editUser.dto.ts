export class EditUserDTO {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  phoneNumber: number;
  createdDateTime?: Date;

  constructor(data: any) {
    this.id = data.id || 0;
    this.email = data.email || '';
    this.firstName = data.firstName || '';
    this.lastName = data.lastName || '';
    this.dateOfBirth = data.dateOfBirth || '';
    this.phoneNumber = data.phoneNumber || 0;
    this.createdDateTime = data.createdDateTime ? new Date(data.createdDateTime) : undefined;
  }
}
