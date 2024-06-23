export interface usuario {
    id: string;
    username: string;
    email: string;
    password: string;
}

export interface userCredentials {
  username: string;
  email: string;
  password: string;
  role: string;
}

export interface changePassword {
  email: string;
  newPassword: string;
}

export interface data {
  token: string;
  expiration: Date;
  username: string;
  email: string;
  role: string;
  administration: string;
  code: string;
}
export interface responseAuthentication {
  data: data;
  status: string;
}

export interface user {
  id: string;
  email: string;
}
