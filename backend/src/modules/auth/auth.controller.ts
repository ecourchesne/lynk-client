import { Body, Controller, Post } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { User } from "@prisma/client";

@Controller("auth")
export class AuthController {
  public constructor(private authService: AuthService) {}

  @Post("register")
  public async register(@Body() body: User) {
    return this.authService.register(body);
  }

  @Post("login")
  public async login(@Body() body: { email: string; password: string }) {
    return this.authService.login(body.email, body.password);
  }
}
