import { ClientType } from "src/utils/enums/client-type.enum";
import { Injectable } from "@nestjs/common";
import { UnauthorizedException } from "@nestjs/common";
import * as bcrypt from "bcrypt";
import * as jwt from "jsonwebtoken";
import { PrismaService } from "../prisma/prisma.service";
import { User } from "@prisma/client";
import { UserCreationDto } from "./dto/user.creation.dto";
import { decodeActivationKey } from "src/utils/function";

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

  public async register(userDto: UserCreationDto): Promise<User> {
    const hashedPassword = await this.hashPassword(userDto.password);

    const data = {
      password: hashedPassword,
      firstName: userDto.firstName.toLowerCase(),
      lastName: userDto.lastName.toLowerCase(),
      role: userDto.activationKey ? "user" : "admin",
    };

    let user;

    if (userDto.activationKey) {
      const isValidKey = await this.isValidActivationKey(userDto.activationKey);
      if (!isValidKey) {
        throw new UnauthorizedException("Invalid activation key");
      }
      user = await this.prismaService.user.update({
        where: { email: userDto.email },
        data,
        include: {
          client: {
            include: {
              commercial: true,
              personal: true,
            },
          },
        },
      });
    } else {
      user = await this.prismaService.user.create({
        data: {
          ...data,
          email: userDto.email,
        },
      });
    }

    return user;
  }

  public async login(
    email: string,
    password: string
  ): Promise<User & { companyId: number | null; decoderId: number | null }> {
    const user = await this.prismaService.user.findUnique({
      where: { email },
      include: {
        client: {
          include: {
            commercial: true,
            personal: true,
          },
        },
      },
    });

    if (!user || !(await bcrypt.compare(password, user.password))) {
      throw new UnauthorizedException("Invalid credentials");
    }

    const companyId = user.client?.commercial?.companyId || null;
    const decoderId = user.client?.personal?.decoderId || null;

    return { ...user, companyId, decoderId };
  }

  public async validateToken(token: string): Promise<void> {
    try {
      return jwt.verify(token, this.jwtSecret);
    } catch (error) {
      throw new UnauthorizedException("Invalid or expired token");
    }
  }

  public async isValidActivationKey(activationKey: number): Promise<boolean> {
    const secret: { type; id } = decodeActivationKey(activationKey.toString());
    if (secret.type === ClientType.PERSONNAL) {
      return (
        (await this.prismaService.decoder.findUnique({
          where: { id: secret.id },
        })) !== null
      ); // Check if decoder exists
    } else {
      return (
        (await this.prismaService.company.findUnique({
          where: { id: secret.id },
        })) !== null
      ); // Check if company exists
    }
  }
}
