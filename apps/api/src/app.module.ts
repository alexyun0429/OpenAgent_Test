import { Module } from '@nestjs/common';

import { ContactsModule } from './contacts/contacts.module';
import { PrismaModule } from './prisma/prisma.module';

@Module({
  imports: [PrismaModule, ContactsModule],
})
export class AppModule {}