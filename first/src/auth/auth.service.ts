import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { User } from '../users/schemas/user.schema';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly usersService: UsersService
  ) {}

  async login(email: string, password: string): Promise<{ accessToken: string }> {
    const user = await this.usersService.validateUser(email, password);
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const payload = { sub: email }; // Use email as payload
    const accessToken = this.jwtService.sign(payload);

    return { accessToken };
  }

  async verifyToken(token: string): Promise<any> {
    try {
      return this.jwtService.verifyAsync(token);
    } catch {
      return null;
    }
  }
}
