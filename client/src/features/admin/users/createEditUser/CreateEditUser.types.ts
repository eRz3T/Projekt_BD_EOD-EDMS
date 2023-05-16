export enum UserRoles {
  ADMIN = 'admin',
  USER = 'user',
}

export interface ICreateEditUserForm {
  firstName: string
  lastName: string
  email: string
  password: string
  role: UserRoles
}
