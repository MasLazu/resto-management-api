import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { EmployeeModule } from 'src/employee/employee.module';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    EmployeeModule,
    JwtModule.register({
      global: true,
      secret: 'kajdoawidoadiaoidjaoidoadoaidogieirgur',
      signOptions: { expiresIn: '3600s' },
    }),
  ],
  providers: [AuthService],
  controllers: [AuthController],
})
export class AuthModule {}
