import { ICreateEditUserForm } from './CreateEditUser.types'

interface IDataToSend {
  first_name?: string
  last_name?: string
  role?: string
  password?: string
  email?: string
}

export const serializeEditedData = (data: ICreateEditUserForm): IDataToSend => {
  let userDetails: IDataToSend = {}

  if (data.firstName && data.firstName.length > 0) {
    userDetails.first_name = data.firstName
  }

  if (data.lastName && data.lastName.length > 0) {
    userDetails.last_name = data.lastName
  }

  if (data.role && data.role.length > 0) {
    userDetails.role = data.role
  }

  if (data.password && data.password.length > 0) {
    userDetails.password = data.password
  }

  if (data.email && data.email.length > 0) {
    userDetails.email = data.email
  }

  return userDetails
}
