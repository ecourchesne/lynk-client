import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { Decoder } from "@prisma/client";
import { CreateDecoderDto } from "./dto/create-decoder.dto";
import { UpdateDecoderDto } from "./dto/update-decoder.dto";

@Injectable()
export class DecoderService {
  constructor(private prismaService: PrismaService) {}

  async createDecoder(data: CreateDecoderDto): Promise<Decoder> {
    return this.prismaService.decoder.create({
      data,
    });
  }

  async getDecoder(id: number): Promise<Decoder | null> {
    return this.prismaService.decoder.findUnique({
      where: { id },
      include: {
        subscriptions: true,
      },
    });
  }

  async getAllDecoders(): Promise<Decoder[]> {
    return this.prismaService.decoder.findMany();
  }

  async updateDecoder(id: number, data: UpdateDecoderDto): Promise<Decoder> {
    return this.prismaService.decoder.update({
      where: { id },
      data,
    });
  }

  async deleteDecoder(id: number): Promise<Decoder> {
    return this.prismaService.decoder.delete({
      where: { id },
    });
  }
}
