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

  // Add multiple subscription items to a decoder
  async addSubscriptionsToDecoder(
    decoderId: number,
    subscriptionItemIds: number[]
  ): Promise<Decoder> {
    return this.prismaService.decoder.update({
      where: { id: decoderId },
      data: {
        subscriptions: {
          connect: subscriptionItemIds.map((id) => ({ id })),
        },
      },
      include: {
        subscriptions: true,
      },
    });
  }

  // Remove multiple subscription items from a decoder
  async removeSubscriptionsFromDecoder(
    decoderId: number,
    subscriptionItemIds: number[]
  ): Promise<Decoder> {
    return this.prismaService.decoder.update({
      where: { id: decoderId },
      data: {
        subscriptions: {
          disconnect: subscriptionItemIds.map((id) => ({ id })),
        },
      },
      include: {
        subscriptions: true,
      },
    });
  }

  // Reset the decoder
  async resetDecoder(id: number): Promise<Decoder> {
    const resetTime = new Date();
    return this.prismaService.decoder.update({
      where: { id },
      data: {
        state: "active", // Assume resetting sets the decoder to active
        lastRestartedAt: resetTime,
      },
    });
  }

  // Reinitialize the decoder
  async reinitDecoder(id: number): Promise<Decoder> {
    const reinitTime = new Date();
    return this.prismaService.decoder.update({
      where: { id },
      data: {
        state: "active",
        lastReinitializedAt: reinitTime,
      },
    });
  }

  // Shutdown the decoder
  async shutdownDecoder(id: number): Promise<Decoder> {
    return this.prismaService.decoder.update({
      where: { id },
      data: {
        state: "inactive", // Assume shutting down sets the decoder to inactive
      },
      include: {
        subscriptions: true,
      },
    });
  }

  // Get decoder info
  async getDecoderInfo(id: number): Promise<Decoder | null> {
    return this.prismaService.decoder.findUnique({
      where: { id },
    });
  }
}
