import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, MinLength, MaxLength } from 'class-validator';

export class CreateProfileDto {
  @ApiProperty({
    description: 'ชื่อ',
    example: 'ปณิจชัย',
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  @MinLength(2)
  @MaxLength(50)
  firstName: string;

  @ApiProperty({
    description: 'นามสกุล',
    example: 'แจงเล็ก',
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  @MinLength(2)
  @MaxLength(50)
  lastName: string;

  @ApiProperty({
    description: 'tittle',
    example: 'tittle',
    required: false,
  })
  @IsString()
  tittle: string;

  @ApiProperty({
    description: 'aboutMe',
    example: 'aboutMe',
    required: false,
  })
  @IsString()
  aboutMe: string;
}
