/**
 * Base model
 */
export class BaseModel {
  /**
   * Id of the model
   */
  public id: number;

  /**
   * Date when the model was created
   */
  public createdAt?: string | Date;

  /**
   * Date when the model was modified for the last time
   */
  public updatedAt?: string | Date;
}
