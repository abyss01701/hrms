import {
  IsString,
  IsNotEmpty,
  IsOptional,
  IsInt,
  IsEmail,
  IsArray,
  ArrayNotEmpty,
  ArrayMinSize,
  IsUUID,
} from 'class-validator';

export class CreateClientDto {
  @IsString()
  @IsNotEmpty()
  clientName: string;

  @IsString()
  plan: string;

  @IsString()
  @IsOptional()
  status: string = 'active';

  @IsString()
  @IsNotEmpty()
  domain: string;

  @IsInt()
  employees: number;

  @IsEmail()
  adminEmail: string;

  @IsArray()
  @ArrayNotEmpty()
  moduleName: string[];

  @IsArray()
  @IsOptional()
  moduleFeatures?: string[];
}
