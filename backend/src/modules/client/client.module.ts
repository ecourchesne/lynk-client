import { Module } from '@nestjs/common';
import { ClientController } from './client.controller';
import { ClientService } from './client.service';
import { ConfigModule } from "@nestjs/config";
import { PrismaService } from '../prisma/prisma.service';

@Module({
  imports: [ConfigModule],
  controllers: [ClientController],
  providers: [ClientService, PrismaService
  ]
})
export class ClientModule {}
