import { Controller, Get, Post, Put, Delete, Body, Param, ParseIntPipe } from '@nestjs/common';
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
}