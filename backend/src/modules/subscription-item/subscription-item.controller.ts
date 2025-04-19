import { Controller, Get, Post, Put, Delete, Body, Param, ParseIntPipe, NotFoundException } from '@nestjs/common';
import { SubscriptionItemService } from './subscription-item.service';
import { SubscriptionItem } from '@prisma/client';
import { CreateSubscriptionItemDto } from './dto/create-subscription-item.dto';
import { UpdateSubscriptionItemDto } from './dto/update-subsription-item.dto';

@Controller('subscription-item')
export class SubscriptionItemController {
  constructor(private subscriptionItemService: SubscriptionItemService) {}

  @Post()
  async createSubscriptionItem(@Body() data: CreateSubscriptionItemDto): Promise<SubscriptionItem> {
    return this.subscriptionItemService.createSubscriptionItem(data);
  }

  @Get(':id')
  async getSubscriptionItem(@Param('id', ParseIntPipe) id: number): Promise<SubscriptionItem> {
    const item = await this.subscriptionItemService.getSubscriptionItem(id);
    if (!item) {
      throw new NotFoundException(`Subscription item with id ${id} not found`);
    }
    return item;
  }

  @Get()
  async getAllSubscriptionItems(): Promise<SubscriptionItem[]> {
    return this.subscriptionItemService.getAllSubscriptionItems();
  }

  @Put(':id')
  async updateSubscriptionItem(
    @Param('id', ParseIntPipe) id: number,
    @Body() data: UpdateSubscriptionItemDto
  ): Promise<SubscriptionItem> {
    return this.subscriptionItemService.updateSubscriptionItem(id, data);
  }

  @Delete(':id')
  async deleteSubscriptionItem(@Param('id', ParseIntPipe) id: number): Promise<SubscriptionItem> {
    return this.subscriptionItemService.deleteSubscriptionItem(id);
  }
}