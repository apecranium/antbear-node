export interface User {
  id?: string;
  name?: string;
  credentials: {
    email?: string;
    password?: string;
  };
}
