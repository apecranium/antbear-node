export interface Credentials {
  email?: string;
  password?: string;
}

export interface User {
  id?: string;
  name?: string;
  credentials: Credentials;
}
