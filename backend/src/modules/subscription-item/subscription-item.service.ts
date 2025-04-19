import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { SubscriptionItem } from '@prisma/client';
import { UpdateSubscriptionItemDto } from './dto/update-subsription-item.dto';
import { CreateSubscriptionItemDto } from './dto/create-subscription-item.dto';

@Injectable()
export class SubscriptionItemService {
  constructor(private prismaService: PrismaService) {}

  async createSubscriptionItem(data: CreateSubscriptionItemDto): Promise<SubscriptionItem> {
    return this.prismaService.subscriptionItem.create({
      data,
    });
  }

  async getSubscriptionItem(id: number): Promise<SubscriptionItem | null> {
    return this.prismaService.subscriptionItem.findUnique({
      where: { id },
    });
  }

  async getAllSubscriptionItems(): Promise<SubscriptionItem[]> {
    return this.prismaService.subscriptionItem.findMany();
  }

  async updateSubscriptionItem(id: number, data: UpdateSubscriptionItemDto): Promise<SubscriptionItem> {
    return this.prismaService.subscriptionItem.update({
      where: { id },
      data,
    });
  }

  async deleteSubscriptionItem(id: number): Promise<SubscriptionItem> {
    return this.prismaService.subscriptionItem.delete({
      where: { id },
    });
  }
}