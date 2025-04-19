import { Module } from "@nestjs/common";
import { PrismaModule } from "./modules/prisma/prisma.module";
import { AuthModule } from "./modules/auth/auth.module";
import { ClientModule } from "./modules/client/client.module";
import { DecoderModule } from './modules/decoder/decoder.module';
import { SubscriptionItemModule } from './modules/subscription-item/subscription-item.module';
import { CompanyModule } from "./modules/company/company.module";

@Module({
  imports: [PrismaModule, AuthModule, CompanyModule, ClientModule, DecoderModule, SubscriptionItemModule],
})
export class AppModule {}
