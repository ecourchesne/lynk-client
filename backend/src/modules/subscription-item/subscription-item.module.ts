import { Module } from '@nestjs/common';
import { SubscriptionItemService } from './subscription-item.service';
import { SubscriptionItemController } from './subscription-item.controller';
import { ConfigModule } from '@nestjs/config';
import { PrismaService } from '../prisma/prisma.service';

@Module({
  imports: [ConfigModule],
  providers: [SubscriptionItemService, PrismaService],
  controllers: [SubscriptionItemController]
})
export class SubscriptionItemModule {}
