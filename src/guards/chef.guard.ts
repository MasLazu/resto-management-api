import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { EmployeePosition } from 'src/employee/schemas/employee.schema';

@Injectable()
export class ChefGuard implements CanActivate {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    if (!request.user || request.user.position !== EmployeePosition.CHEF) {
      throw new UnauthorizedException();
    }
    return true;
  }
}
