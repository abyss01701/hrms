import {
  Injectable,
  ConflictException,
  UnauthorizedException,
  NotFoundException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { HashService } from '../common/hash/hash.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly hashService: HashService,
    private readonly jwtService: JwtService,

  ) {}

  async validateUser(email: string, password: string) {
    const user = await this.usersService.findByEmail(email);
    if (!user) return null;

    const isValid = await this.hashService.verify(user.passwordHash, password);
    if (!isValid) return null;

    if (!user.isActive) {
      throw new UnauthorizedException('Account is disabled');
    }

    return user;
  }

  async register(dto: any) {
    const existing = await this.usersService.findByEmail(dto.email);
    if (existing) {
      throw new ConflictException('Email already in use');
    }

    const passwordHash = await this.hashService.hash(dto.password);
    const user = await this.usersService.createUser(dto.name, dto.email, passwordHash);

    const tokens = await this.generateTokens(
      user.id,
      user.email,
      user.role,
      user.tokenVersion,
    );

    return { user: this.sanitizeUser(user), ...tokens };
  }

  async login(user: any) {
    const tokens = await this.generateTokens(
      user.id,
      user.email,
      user.role,
      user.tokenVersion,
    );

    return { user: this.sanitizeUser(user), ...tokens };
  }

  /** FIXED — refresh token must lookup user by ID, not email */
  async refreshTokens(userId: string, tokenVersion: number) {
    const user = await this.usersService.findOneById(userId);
    if (!user) {
      throw new UnauthorizedException('User not found');
    }

    if (user.tokenVersion !== tokenVersion) {
      throw new UnauthorizedException('Token has been invalidated');
    }

    const tokens = await this.generateTokens(
      user.id,
      user.email,
      user.role,
      user.tokenVersion,
    );

    return { user: this.sanitizeUser(user), ...tokens };
  }

  async logout(userId: string) {
    await this.usersService.incrementTokenVersion(userId);
    return { success: true };
  }

  sanitizeUser(user: any) {
    const { passwordHash, ...rest } = user;
    return rest;
  }

  async generateTokens(
    userId: string,
    email: string,
    role: string,
    tokenVersion: number,
  ) {
    const payload = { sub: userId, email, role, tokenVersion };

    const accessToken = await this.jwtService.signAsync(payload, {
      secret: process.env.JWT_ACCESS_SECRET,
      expiresIn:
        Number(process.env.JWT_ACCESS_EXPIRES_IN) || 900, // 15 minutes default
    });

    const refreshToken = await this.jwtService.signAsync(
      { sub: userId, tokenVersion },
      {
        secret: process.env.JWT_REFRESH_SECRET,
        expiresIn:
          Number(process.env.JWT_REFRESH_EXPIRES_IN) || 604800, // 7 days default
      },
    );
    
    return { accessToken, refreshToken };
  }
}
