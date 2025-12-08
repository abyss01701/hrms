import {
  Body,
  Controller,
  Post,
  Req,
  Res,
  HttpCode,
  HttpStatus,
  UnauthorizedException,
  UseGuards,
  Get,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import type { Response, Request } from 'express';

import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { ChangePasswordDto } from './dto/changePassword.dto';

const isProd = process.env.NODE_ENV === 'production';

// Set refresh token cookie
function setRefreshTokenCookie(res: Response, token: string) {
  res.cookie('refresh_token', token, {
    httpOnly: true,
    secure: isProd,
    sameSite: isProd ? 'strict' : 'lax',
    path: '/',
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
  });
}

// Clear refresh token cookie
function clearRefreshTokenCookie(res: Response) {
  res.clearCookie('refresh_token', { path: '/' });
}

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly jwtService: JwtService,
  ) {}

  @Post('register')
  async register(
    @Body() dto: RegisterDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    const data = await this.authService.register(dto);

    setRefreshTokenCookie(res, data.refreshToken);

    return {
      user: data.user,
      accessToken: data.accessToken,
    };
  }

  @UseGuards(LocalAuthGuard)
  @Post('login')
  @HttpCode(HttpStatus.OK)
  async login(
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response,
  ) {
    const user = req.user;
    const data = await this.authService.login(user);

    setRefreshTokenCookie(res, data.refreshToken);

    return {
      user: data.user,
      accessToken: data.accessToken,
    };
  }

  @Post('refresh')
  async refresh(
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response,
  ) {
    const token = req.cookies?.['refresh_token'];
    if (!token) {
      throw new UnauthorizedException('No refresh token found');
    }

    try {
      const payload: any = this.jwtService.verify(token, {
        secret: process.env.JWT_REFRESH_SECRET,
      });

      const newTokens = await this.authService.refreshTokens(
        payload.sub,
        payload.tokenVersion,
      );

      setRefreshTokenCookie(res, newTokens.refreshToken);

      return {
        accessToken: newTokens.accessToken,
        user: newTokens.user,
      };
    } catch (err) {
      throw new UnauthorizedException('Invalid or expired refresh token');
    }
  }

  @Post('change-password')
  changePassword(@Body() dto: ChangePasswordDto) {
    return this.authService.changePassword(
      dto.adminEmail,
      dto.oldPassword,
      dto.newPassword,
    );
  }

  @UseGuards(JwtAuthGuard)
  @Post('logout')
  async logout(
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response,
  ) {
    const user: any = req.user;
    await this.authService.logout(user.userId);

    clearRefreshTokenCookie(res);

    return { success: true };
  }

  @Get('me')
  @UseGuards(JwtAuthGuard)
  getProfile(@Req() req: Request) {
    return req.user;
  }
}
