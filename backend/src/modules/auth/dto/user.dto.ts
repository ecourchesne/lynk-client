import { Prisma } from "@prisma/client";
import { BaseModel } from "src/utils/models/base-model.model";
/**
 * Model for a user
 */
export class User extends BaseModel implements Prisma.UserCreateInput {
  /**
   * Password of the user
   */
  public password: string;

  /**
   * First name of the user
   */
  public firstName: string;

  /**
   * Last name of the user
   */
  public lastName: string;

  /**
   * Email of the user
   */
  public email: string;

  /**
   * Role of the user
   */
  public role: string;
}
