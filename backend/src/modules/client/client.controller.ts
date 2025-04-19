import { 
    Controller, 
    Get, 
    Post, 
    Put, 
    Delete, 
    Body, 
    Param, 
    ParseIntPipe, 
    NotFoundException 
  } from '@nestjs/common';
  import { ClientService } from './client.service';
  import { CommercialClientDto } from './dto/commercial-client.dto';
  import { PersonalClientDto } from './dto/personal-client.dto';
  import { Client, CommercialClient, PersonalClient } from '@prisma/client';
  
  @Controller('client')
  export class ClientController {
    public constructor(private clientService: ClientService) {}
  
    @Post('commercial')
    public async createCommercialClient(
      @Body() dto: CommercialClientDto
    ): Promise<CommercialClient & { client: Client }> {
      return this.clientService.createCommercialClient(dto);
    }
  
    @Post('personal')
    public async createPersonalClient(
      @Body() dto: PersonalClientDto
    ): Promise<PersonalClient & { client: Client }> {
      return this.clientService.createPersonalClient(dto);
    }
  
    @Get()
    public async findAll() {
      return this.clientService.findAll();
    }
  
    @Get(':id')
    public async findOne(@Param('id', ParseIntPipe) id: number) {
      return this.clientService.findOne(id);
    }
  
    @Put('commercial/:id')
    public async updateCommercialClient(
      @Param('id', ParseIntPipe) id: number,
      @Body() dto: Partial<CommercialClientDto>
    ) {
      return this.clientService.updateCommercialClient(id, dto);
    }
  
    @Put('personal/:id')
    public async updatePersonalClient(
      @Param('id', ParseIntPipe) id: number,
      @Body() dto: Partial<PersonalClientDto>
    ) {
      return this.clientService.updatePersonalClient(id, dto);
    }
  
    @Delete(':id')
    public async delete(@Param('id', ParseIntPipe) id: number): Promise<void> {
      return this.clientService.delete(id);
    }
  }