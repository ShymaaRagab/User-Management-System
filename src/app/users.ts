export interface Users {
  id?: number;
  firstName: string;
  lastName: string;
  age: number;
  gender: string;
  image: string;
  company: {
    department: string;
    title: string;
  },
  role: string;
}
