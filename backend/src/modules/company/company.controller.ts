import { Body, Controller, Delete, Get, NotFoundException, Param, ParseIntPipe, Post, Put } from '@nestjs/common';
import { CompanyService } from './company.service';
import { Company } from '@prisma/client';
import { CreateCompanyDto } from './dto/create-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';

@Controller('company')
export class CompanyController {
  constructor(private companyService: CompanyService) {}

  @Post()
  async createCompany(@Body() data: CreateCompanyDto): Promise<Company> {
    return this.companyService.createCompany(data);
  }

  @Get(':id')
  async getCompany(@Param('id', ParseIntPipe) id: number): Promise<Company> {
    const company = await this.companyService.getCompany(id);
    if (!company) {
      throw new NotFoundException(`Company with ID ${id} not found`);
    }
    return company;
  }

  @Get()
  async getAllCompanies(): Promise<Company[]> {
    return this.companyService.getAllCompanies();
  }

  @Put(':id')
  async updateCompany(
    @Param('id', ParseIntPipe) id: number,
    @Body() data: UpdateCompanyDto
  ): Promise<Company> {
    return this.companyService.updateCompany(id, data);
  }

  @Delete(':id')
  async deleteCompany(@Param('id', ParseIntPipe) id: number): Promise<Company> {
    return this.companyService.deleteCompany(id);
  }
}