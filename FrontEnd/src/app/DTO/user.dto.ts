export interface UserDTO {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: number;
    dateOfBirth: string; 
    profilePictureUrl?: string;
    roleId?: number;
    password?: string;
    createdDateTime?: string | null; 
  }
  