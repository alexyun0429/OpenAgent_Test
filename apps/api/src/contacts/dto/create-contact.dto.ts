import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  Matches,
} from 'class-validator';

export class CreateContactDto {
  @IsString()
  @IsNotEmpty()
  firstName: string;

  @IsString()
  @IsNotEmpty()
  lastName: string;

  @IsEmail()
  email: string;

  @Matches(/^(\+?61|0)[2-9]\d{8}$/, {
    message: 'phone must be a valid Australian phone number',
  })
  phone: string;

  @IsOptional()
  @IsString()
  note?: string;
}
