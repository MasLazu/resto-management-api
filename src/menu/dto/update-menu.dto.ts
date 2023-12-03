import { IsString, IsNumber, IsOptional } from 'class-validator';

export class UpdateMenuDto {
  @IsOptional()
  @IsString()
  name: string;

  @IsOptional()
  @IsNumber()
  price: number;

  @IsOptional()
  @IsString()
  category: string;

  @IsOptional()
  @IsString()
  description: string;
}
