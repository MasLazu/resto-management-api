import { IsString } from 'class-validator';

export class UpdateCategoryDto {
  @IsString()
  readonly name: string;

  @IsString()
  readonly description: string;
}
