import { Module } from '@nestjs/common';
import { DecoderService } from './decoder.service';
import { DecoderController } from './decoder.controller';
import { PrismaService } from '../prisma/prisma.service';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule],
  providers: [DecoderService, PrismaService],
  controllers: [DecoderController]
})
export class DecoderModule {}
