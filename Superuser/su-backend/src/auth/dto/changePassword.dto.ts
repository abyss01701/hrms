import { IsEmail, IsString, MinLength } from 'class-validator';

export class ChangePasswordDto {
  @IsEmail()
  adminEmail: string;

  @IsString()
  oldPassword: string;

  @IsString()
  @MinLength(8)
  newPassword: string;
}
