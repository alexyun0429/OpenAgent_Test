import { ContactsService } from './contacts.service';

describe('ContactsService', () => {
  it('creates the service instance', () => {
    const prisma = {
      contact: {
        create: jest.fn(),
        findMany: jest.fn(),
        update: jest.fn(),
        delete: jest.fn(),
      },
    } as any;

    expect(new ContactsService(prisma)).toBeInstanceOf(ContactsService);
  });
});