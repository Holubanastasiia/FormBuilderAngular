export interface User {
  name: string;
  email: string;
  id: any;
  password: string;
}

export interface DbAuthResponse {
  idToken: string;
  expiresIn: string;
}
