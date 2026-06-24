export type Contact = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  note: string | null;
  verified: boolean;
  createdAt: string;
  updatedAt: string;
};

export type CreateContactDto = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  note?: string;
};
