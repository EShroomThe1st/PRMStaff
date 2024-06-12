export interface User{
  user_id: string,
  first_name: string,
  middle_name: string,
  last_name: string,
  password: string,
  email: string,
  phone_number: string,
  last_update: string,
  is_active: boolean,
  role_id: string,
  role_name?: string,
  address: string,
}

export interface CreateUser{
  firstName: string,
  middleName: string,
  lastName: string,
  password: string,
  email: string,
  phone_number: string,
  role_name: string,
}

export interface Role{
  role_id: string,
  role_name: string,
}