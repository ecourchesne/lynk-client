import { Prisma } from "@prisma/client";
import { ClientDto } from "./client.dto";
import { ClientType } from "src/utils/enums/client-type.enum";

/**
 * Model for a commercial client
 */
export class CommercialClientDto extends ClientDto {
  /**
   * Company identifier
   */
  public companyId: number;

   /**
   * Convert to Prisma create input for PersonalClient
   */
   public toPrismaCreateInput(): Prisma.ClientCreateInput & { commercial: Prisma.CommercialClientCreateNestedOneWithoutClientInput } {
    return {
      ...super.toPrismaCreateInput(),
      commercial: {
        create: {
          companyId: this.companyId
        }
      }
    };
  }
}