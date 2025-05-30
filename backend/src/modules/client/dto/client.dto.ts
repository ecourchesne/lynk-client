import { Prisma } from "@prisma/client";
import { ClientType } from "src/utils/enums/client-type.enum";
import { BaseModel } from "src/utils/models/base-model.model";
/**
 * Model for a client
 */
export abstract class ClientDto extends BaseModel implements Omit<Prisma.ClientCreateInput, 'user'> {
  /**
   * Email the associated user
   */
  public email: string;

  /**
   * Type of client (COMMERCIAL or PERSONAL)
   */
  public type: ClientType;

  /**
   * Convert to Prisma create input
   */
  public toPrismaCreateInput(): Prisma.ClientCreateInput {
    return {
      user: {
        connect: {
          email: this.email,
        }
      },
      type: this.type,
    };
  }
}