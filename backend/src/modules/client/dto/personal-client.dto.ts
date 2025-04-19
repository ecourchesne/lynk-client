import { Prisma } from "@prisma/client";
import { ClientDto } from "./client.dto";
import { ClientType } from "src/utils/enums/client-type.enum";
/**
 * Model for a personal client
 */
export class PersonalClientDto extends ClientDto {
  /**
   * Decoder identifier
   */
  public decoderId: number;

  /**
   * Convert to Prisma create input for PersonalClient
   */
  public toPrismaCreateInput(): Prisma.ClientCreateInput & { personal: Prisma.PersonalClientCreateNestedOneWithoutClientInput } {
    return {
      ...super.toPrismaCreateInput(),
      personal: {
        create: {
          decoderId: this.decoderId
        }
      }
    };
  }
}