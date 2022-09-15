import {
  Body,
  Controller,
  Logger,
  Post,
  Res,
  Req,
  UseInterceptors,
} from '@nestjs/common';
import { Response, Request } from 'express';
import { ApiTags, ApiResponse, ApiOperation } from '@nestjs/swagger';
import { LoggingInterceptor } from '../../core/security/interceptors/logging.interceptor';
import { AuthService } from '../services/auth.service';
import { UserLoginDTO } from '../dtos/user-login.dto';

@Controller('api')
@UseInterceptors(LoggingInterceptor)
@ApiTags('user-jwt-controller')
export class UserJWTController {
  logger = new Logger('UserJWTController');

  constructor(private readonly authService: AuthService) {}

  @Post('/authenticate')
  @ApiOperation({ summary: 'Authorization api retrieving token' })
  @ApiResponse({
    status: 201,
    description: 'Authorized',
  })
  async authorize(
    @Req() req: Request,
    @Body() user: UserLoginDTO,
    @Res() res: Response,
  ): Promise<any> {
    console.log({ user });

    const jwt = await this.authService.login(user);
    res.setHeader('Authorization', 'Bearer ' + jwt.id_token);
    return res.json(jwt);
  }
}
