import { IsString, IsNotEmpty } from 'class-validator';

export class SignInEmployeeDto {
  @IsNotEmpty()
  @IsString()
  id: string;

  @IsNotEmpty()
  @IsString()
  password: string;
}
