import { Module } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AuthController } from "./auth.controller";
import { ConfigModule } from "@nestjs/config";
import { PrismaService } from "../prisma/prisma.service";

@Module({
  imports: [ConfigModule],
  providers: [AuthService, PrismaService],
  controllers: [AuthController],
})
export class AuthModule {}