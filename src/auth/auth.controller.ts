import {
  Controller,
  Post,
  HttpCode,
  HttpStatus,
  Body,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignInEmployeeDto } from './dto/signin-employee.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('signin')
  @HttpCode(HttpStatus.OK)
  async signIn(
    @Body() signIn: SignInEmployeeDto,
  ): Promise<{ access_token: string }> {
    try {
      return await this.authService.signIn(signIn.id, signIn.password);
    } catch (err) {
      throw new UnauthorizedException(err.message);
    }
  }
}
