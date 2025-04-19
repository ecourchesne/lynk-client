/**
 * Model for a user
 */
export class UserCreationDto {
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
   * Activation code of the user
   */
  public activationKey: number;
}
