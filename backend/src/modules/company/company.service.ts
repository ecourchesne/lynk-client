import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { Company } from "@prisma/client";
import { CreateCompanyDto } from "./dto/create-company.dto";
import { UpdateCompanyDto } from "./dto/update-company.dto";

@Injectable()
export class CompanyService {
  constructor(private prismaService: PrismaService) {}

  async createCompany(data: CreateCompanyDto): Promise<Company> {
    return this.prismaService.company.create({
      data,
    });
  }

  async getCompany(id: number): Promise<Company | null> {
    return this.prismaService.company.findUnique({
      where: { id },
    });
  }

  async getAllCompanies(): Promise<Company[]> {
    return this.prismaService.company.findMany({ include: { decoders: true } });
  }

  async updateCompany(id: number, data: UpdateCompanyDto): Promise<Company> {
    return this.prismaService.company.update({
      where: { id },
      data,
    });
  }

  async deleteCompany(id: number): Promise<Company> {
    return this.prismaService.company.delete({
      where: { id },
    });
  }
}
