import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  MinLength,
} from 'class-validator';

export class CreateUserDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  readonly name: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  readonly username: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsEmail({}, { message: 'Please enter a correct email' })
  readonly email: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @MinLength(6)
  readonly password: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  readonly bio: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  readonly website: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  readonly picture: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  readonly isOAuthUser: boolean;

  @ApiProperty()
  @IsOptional()
  @IsString()
  readonly onboardingCompleted: boolean;
}

export class UpdateUserDto {
  @IsOptional()
  @IsString()
  readonly name: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  readonly username: string;

  @ApiProperty()
  @IsOptional()
  @IsEmail({}, { message: 'Please enter a correct email' })
  readonly email: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  @MinLength(6)
  readonly password: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  readonly bio: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  readonly website: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  readonly picture: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  readonly isOAuthUser: boolean;

  @ApiProperty()
  @IsOptional()
  @IsString()
  readonly onboardingCompleted: boolean;
}
