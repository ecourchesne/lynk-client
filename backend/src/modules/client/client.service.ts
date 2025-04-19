import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CommercialClientDto } from './dto/commercial-client.dto';
import { PersonalClientDto } from './dto/personal-client.dto';
import { Client, CommercialClient, PersonalClient } from '@prisma/client';
import { ClientType } from 'src/utils/enums/client-type.enum';

@Injectable()
export class ClientService {
  public constructor(private prismaService: PrismaService) {}

  /**
   * Create a new commercial client
   */
  public async createCommercialClient(dto: CommercialClientDto): Promise<CommercialClient & { client: Client }> {
    // Check if a client with the same userId already exists
    const existingClient = await this.prismaService.client.findUnique({
      where: { userId: dto.userId },
    });

    if (existingClient) {
      throw new Error(`Client with userId ${dto.userId} already exists`);
    }

    // First create the base client
    const baseClient = await this.prismaService.client.create({
      data: {
        userId: dto.userId,
        type: ClientType.COMMERCIAL,
      }
    });

    // Then create the commercial client
    return await this.prismaService.commercialClient.create({
      data: {
        clientId: baseClient.id,
        companyId: dto.companyId,
      },
      include: {
        client: true
      }
    });
  }

  /**
   * Create a new personal client
   */
  public async createPersonalClient(dto: PersonalClientDto): Promise<PersonalClient & { client: Client }> {
    // Check if a client with the same userId already exists
    const existingClient = await this.prismaService.client.findUnique({
      where: { userId: dto.userId },
    });

    if (existingClient) {
      throw new Error(`Client with userId ${dto.userId} already exists`);
    }

      // Validate that the decoderId exists
    const decoderExists = await this.prismaService.decoder.findUnique({
      where: { id: dto.decoderId },
    });

    if (!decoderExists) {
      throw new Error(`Decoder with id ${dto.decoderId} does not exist`);
    }
    
    // First create the base client
    const baseClient = await this.prismaService.client.create({
      data: {
        userId: dto.userId,
        type: ClientType.PERSONNAL,
      }
    });

    // Then create the personal client
    return await this.prismaService.personalClient.create({
      data: {
        clientId: baseClient.id,
        decoderId: dto.decoderId,
      },
      include: {
        client: true
      }
    });
  }

  /**
   * Find all clients
   */
  public async findAll() {
    const clients = await this.prismaService.client.findMany({
      include: {
        commercial: true,
        personal: true
      }
    });

    return clients.map(client => {
      if (client.type === ClientType.COMMERCIAL && client.commercial) {
        const { personal, ...commercialClient } = client;
        return commercialClient;
      } else if (client.type === ClientType.PERSONNAL && client.personal) {
        const { commercial, ...personalClient } = client;
        return personalClient;
      }
      return client;
    });
  }

  /**
   * Find one client by id
   */
  public async findOne(id: number) {
    const client = await this.prismaService.client.findUnique({
      where: { id },
      include: {
        commercial: true,
        personal: true
      }
    });

    if (!client) {
      throw new NotFoundException(`Client #${id} not found`);
    }

    if (client.type === ClientType.COMMERCIAL && client.commercial) {
      const { personal, ...commercialClient } = client;
      return commercialClient;
    } else if (client.type === ClientType.PERSONNAL && client.personal) {
      const { commercial, ...personalClient } = client;
      return personalClient;
    }

    throw new NotFoundException(`Invalid client type for client #${id}`);
  }

  /**
   * Update commercial client
   */
  public async updateCommercialClient(id: number, dto: Partial<CommercialClientDto>) {
    const client = await this.findOne(id);
    
    // Type guard to check if it's a commercial client
    if (client.type !== ClientType.COMMERCIAL) {
      throw new NotFoundException(`Commercial client #${id} not found`);
    }

    if (dto.userId) {
      await this.prismaService.client.update({
        where: { id },
        data: {
          userId: dto.userId
        }
      });
    }

    const updated = await this.prismaService.commercialClient.update({
      where: { clientId: id },
      data: {
        companyId: dto.companyId,
      },
      include: {
        client: true
      }
    });

    return updated;
  }

  /**
   * Update personal client
   */
  public async updatePersonalClient(id: number, dto: Partial<PersonalClientDto>) {
    const client = await this.findOne(id);
    
    // Type guard to check if it's a personal client
    if (client.type !== ClientType.PERSONNAL) {
      throw new NotFoundException(`Personal client #${id} not found`);
    }

    if (dto.userId) {
      await this.prismaService.client.update({
        where: { id },
        data: {
          userId: dto.userId
        }
      });
    }

    return await this.prismaService.personalClient.update({
      where: { clientId: id },
      data: {
        decoderId: dto.decoderId
      },
      include: {
        client: true
      }
    });
  }

  /**
   * Delete a client
   */
  public async delete(id: number): Promise<void> {
    const client = await this.findOne(id);

    await this.prismaService.$transaction(async (tx) => {
      if (client.type === ClientType.COMMERCIAL) {
        await tx.commercialClient.delete({ where: { clientId: id } });
      } else if (client.type === ClientType.PERSONNAL) {
        await tx.personalClient.delete({ where: { clientId: id } });
      }
      await tx.client.delete({ where: { id } });
    });
  }
}