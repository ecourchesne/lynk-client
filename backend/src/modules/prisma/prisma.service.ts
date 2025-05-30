import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PrismaClient } from "@prisma/client";

@Injectable()
export class PrismaService extends PrismaClient {
  public constructor(private configService: ConfigService) {
    super({
      datasources: {
        db: {
          url: configService.get<string>("DATABASE_URL"),
        },
      },
    });
  }
}
