import {
  Controller,
  ClassSerializerInterceptor,
  Get,
  Logger,
  Req,
  UseInterceptors,
} from '@nestjs/common';
import { ApiTags, ApiResponse, ApiOperation } from '@nestjs/swagger';
import { LoggingInterceptor } from 'src/core/security/interceptors/logging.interceptor';
import { AuthService } from '../services/auth.service';
import { UserDTO } from '../dtos/user.dto';
import { Page, PageRequest } from 'src/core/pagination.entity';
import { Request } from '../../core/request';

@Controller('api')
@UseInterceptors(LoggingInterceptor, ClassSerializerInterceptor)
@ApiTags('public-user-controller')
export class PublicUserController {
  logger = new Logger('PublicUserController');

  constructor(private readonly authService: AuthService) {}

  @Get('/users')
  @ApiOperation({ summary: 'Get the list of users' })
  @ApiResponse({
    status: 200,
    description: 'List all users records',
    type: UserDTO,
  })
  async getAllPublicUsers(@Req() req: Request): Promise<UserDTO[]> {
    const sortField = '';
    const pageRequest: PageRequest = new PageRequest(1, 10, sortField);
    const [results, count] = await this.authService.getAllUsers({
      skip: +pageRequest.page * pageRequest.size,
      take: +pageRequest.size,
      order: pageRequest.sort.asOrder(),
    });
    /*     HeaderUtil.addPaginationHeaders(
      req.res,
      new Page(results, count, pageRequest),
    ); */
    return results;
  }

  @Get('/authorities')
  @ApiOperation({ summary: 'Get the list of user roles' })
  @ApiResponse({
    status: 200,
    description: 'List all user roles',
    type: 'string',
    isArray: true,
  })
  getAuthorities(@Req() req: any): any {
    const user: any = req.user;
    if (!user) {
      return [];
    }
    return user.authorities;
  }
}
