import { Test, TestingModule } from '@nestjs/testing';
import { NotFoundException } from '@nestjs/common';
import { ContactsService } from './contacts.service';
import { PrismaService } from '../prisma/prisma.service';

const mockContact = {
  id: 'cuid_1',
  firstName: 'Jane',
  lastName: 'Smith',
  email: 'jane@example.com',
  phone: '0412345678',
  note: null,
  verified: false,
  createdAt: new Date('2026-06-23T00:00:00Z'),
  updatedAt: new Date('2026-06-23T00:00:00Z'),
};

const mockPrisma = {
  contact: {
    create: jest.fn(),
    findMany: jest.fn(),
    findUnique: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  },
};

describe('ContactsService', () => {
  let service: ContactsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ContactsService,
        { provide: PrismaService, useValue: mockPrisma },
      ],
    }).compile();

    service = module.get<ContactsService>(ContactsService);
    jest.clearAllMocks();
  });

  describe('create', () => {
    it('saves the contact and returns it', async () => {
      mockPrisma.contact.create.mockResolvedValue(mockContact);
      const dto = { firstName: 'Jane', lastName: 'Smith', email: 'jane@example.com', phone: '0412345678' };
      const result = await service.create(dto);
      expect(mockPrisma.contact.create).toHaveBeenCalledWith({ data: dto });
      expect(result).toEqual(mockContact);
    });
  });

  describe('findAll', () => {
    it('returns contacts ordered by createdAt descending', async () => {
      mockPrisma.contact.findMany.mockResolvedValue([mockContact]);
      const result = await service.findAll();
      expect(mockPrisma.contact.findMany).toHaveBeenCalledWith({ orderBy: { createdAt: 'desc' } });
      expect(result).toEqual([mockContact]);
    });
  });

  describe('update', () => {
    it('marks the contact as verified and returns updated contact', async () => {
      const updated = { ...mockContact, verified: true };
      mockPrisma.contact.findUnique.mockResolvedValue(mockContact);
      mockPrisma.contact.update.mockResolvedValue(updated);
      const result = await service.update('cuid_1', { verified: true });
      expect(result.verified).toBe(true);
    });

    it('throws NotFoundException when contact does not exist', async () => {
      mockPrisma.contact.findUnique.mockResolvedValue(null);
      await expect(service.update('no_such_id', { verified: true })).rejects.toThrow(NotFoundException);
    });
  });

  describe('remove', () => {
    it('deletes the contact and returns it', async () => {
      mockPrisma.contact.findUnique.mockResolvedValue(mockContact);
      mockPrisma.contact.delete.mockResolvedValue(mockContact);
      const result = await service.remove('cuid_1');
      expect(result).toEqual(mockContact);
    });

    it('throws NotFoundException when contact does not exist', async () => {
      mockPrisma.contact.findUnique.mockResolvedValue(null);
      await expect(service.remove('no_such_id')).rejects.toThrow(NotFoundException);
    });
  });
});
