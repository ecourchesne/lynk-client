import { Injectable } from "@nestjs/common";
import { UnauthorizedException } from "@nestjs/common";
import * as bcrypt from "bcrypt";
import * as jwt from "jsonwebtoken";
import { PrismaService } from "../prisma/prisma.service";
import { User } from "@prisma/client";

@Injectable()
export class AuthService {

  private readonly jwtSecret = "supersecretkey";

  public constructor(private prismaService: PrismaService) {}

  /**
   * The function `hashPassword` asynchronously generates a salt and hashes a given password using
   * bcrypt in TypeScript.
   * @param {string} password - The `password` parameter is a string that represents the user's password
   * that needs to be hashed for security purposes.
   * @returns The `hashPassword` function is returning a Promise that resolves to a hashed version of
   * the input `password` string.
   */
  public async hashPassword(password: string): Promise<string> {
    return bcrypt.hash(password, 10);
  }

  /**
   * The function `generateToken` asynchronously generates a JWT token for a given user ID with an
   * expiration time of 8 hours.
   * @param {number} userId - The `userId` parameter is a number representing the user ID for which the
   * token is being generated.
   * @returns A JWT token is being returned, which is generated using the `jwt.sign` method with the
   * provided `userId`, `jwtSecret`, and an expiration time of 8 hours.
   */
  public async generateToken(userId: number): Promise<string> {
    return jwt.sign({ userId }, this.jwtSecret, { expiresIn: "8h" });
  }

  public async register(userDto: User): Promise<{ token: string }> {
    const hashedPassword = await this.hashPassword(userDto.password);
    const user = await this.prismaService.user.create({
      data: {
        password: hashedPassword,
        firstName: userDto.firstName.toLocaleLowerCase(),
        lastName: userDto.lastName.toLocaleLowerCase(),
        email: userDto.email.toLocaleLowerCase(),
        role: userDto.role.toLocaleLowerCase(),
      },
    });
    const token = await this.generateToken(user.id);
    return { token };
  }

  public async login(email: string, password: string): Promise<{ token: string }> {
    const user = await this.prismaService.user.findUnique({ where: { email } });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      throw new UnauthorizedException("Invalid credentials");
    }
    const token = await this.generateToken(user.id);
    return { token };
  }

  public async validateToken(token: string): Promise<void> {
    try {
      return jwt.verify(token, this.jwtSecret);
    } catch (error) {
      throw new UnauthorizedException("Invalid or expired token");
    }
  }
}
