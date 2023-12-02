import { IsString, IsNumber, IsOptional } from 'class-validator';

export class UpdateMenuDto {
  @IsOptional()
  @IsString()
  readonly name: string;

  @IsOptional()
  @IsNumber()
  readonly price: number;

  @IsOptional()
  @IsString()
  readonly category: string;

  @IsOptional()
  @IsString()
  readonly description: string;
}
