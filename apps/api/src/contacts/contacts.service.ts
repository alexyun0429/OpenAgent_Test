import { Injectable } from '@nestjs/common';

import { PrismaService } from '../prisma/prisma.service';
import { CreateContactDto } from './dto/create-contact.dto';
import { UpdateContactDto } from './dto/update-contact.dto';

@Injectable()
export class ContactsService {
  constructor(private readonly prisma: PrismaService) {}

  create(data: CreateContactDto) {
    return this.prisma.contact.create({ data });
  }

  findAll() {
    return this.prisma.contact.findMany({ orderBy: { createdAt: 'desc' } });
  }

  update(id: string, data: UpdateContactDto) {
    return this.prisma.contact.update({ where: { id }, data });
  }

  async verify(id: string) {
    return this.update(id, { verified: true });
  }

  remove(id: string) {
    return this.prisma.contact.delete({ where: { id } });
  }
}