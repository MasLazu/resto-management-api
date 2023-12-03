import { Controller, Post, HttpCode, HttpStatus, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignInEmployeeDto } from './dto/signin-employee.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('signin')
  @HttpCode(HttpStatus.OK)
  signIn(@Body() signIn: SignInEmployeeDto): Promise<{ access_token: string }> {
    return this.authService.signIn(signIn.id, signIn.password);
  }
}
