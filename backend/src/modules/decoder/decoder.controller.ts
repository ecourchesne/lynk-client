import { Controller, Get, Post, Put, Delete, Body, Param, ParseIntPipe, NotFoundException } from '@nestjs/common';
import { DecoderService } from './decoder.service';
import { Decoder } from '@prisma/client';
import { CreateDecoderDto } from './dto/create-decoder.dto';
import { UpdateDecoderDto } from './dto/update-decoder.dto';

@Controller('decoder')
export class DecoderController {
  constructor(private decoderService: DecoderService) {}

  @Post()
  async createDecoder(@Body() data: CreateDecoderDto): Promise<Decoder> {
    return this.decoderService.createDecoder(data);
  }

  @Get(':id')
  async getDecoder(@Param('id', ParseIntPipe) id: number): Promise<Decoder | null> {
    return this.decoderService.getDecoder(id);
  }

  @Get()
  async getAllDecoders(): Promise<Decoder[]> {
    return this.decoderService.getAllDecoders();
  }

  @Put(':id')
  async updateDecoder(
    @Param('id', ParseIntPipe) id: number,
    @Body() data: UpdateDecoderDto
  ): Promise<Decoder> {
    return this.decoderService.updateDecoder(id, data);
  }

  @Delete(':id')
  async deleteDecoder(@Param('id', ParseIntPipe) id: number): Promise<Decoder> {
    return this.decoderService.deleteDecoder(id);
  }

  @Post(':id/subscriptions')
  async addSubscriptionsToDecoder(
    @Param('id', ParseIntPipe) decoderId: number,
    @Body('subscriptionItemIds') subscriptionItemIds: number[]
  ): Promise<Decoder> {
    return this.decoderService.addSubscriptionsToDecoder(decoderId, subscriptionItemIds);
  }

  @Delete(':id/subscriptions')
  async removeSubscriptionsFromDecoder(
    @Param('id', ParseIntPipe) decoderId: number,
    @Body('subscriptionItemIds') subscriptionItemIds: number[]
  ): Promise<Decoder> {
    return this.decoderService.removeSubscriptionsFromDecoder(decoderId, subscriptionItemIds);
  }

    // Reset the decoder
    @Post(':id/reset')
    async resetDecoder(@Param('id', ParseIntPipe) id: number): Promise<Decoder> {
      return this.decoderService.resetDecoder(id);
    }
  
    // Reinitialize the decoder
    @Post(':id/reinit')
    async reinitDecoder(@Param('id', ParseIntPipe) id: number): Promise<Decoder> {
      return this.decoderService.reinitDecoder(id);
    }
  
    // Shutdown the decoder
    @Post(':id/shutdown')
    async shutdownDecoder(@Param('id', ParseIntPipe) id: number): Promise<Decoder> {
      return this.decoderService.shutdownDecoder(id);
    }
  
    // Get decoder info
    @Get(':id/info')
    async getDecoderInfo(@Param('id', ParseIntPipe) id: number): Promise<Decoder> {
      const decoderInfo = await this.decoderService.getDecoderInfo(id);
      if (!decoderInfo) {
        throw new NotFoundException(`Decoder with ID ${id} not found`);
      }
      return decoderInfo;
    }
}