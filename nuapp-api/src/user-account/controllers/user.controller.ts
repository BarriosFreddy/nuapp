import {
  Body,
  Controller,
  Delete,
  Get,
  Logger,
  Param,
  Post,
  Put,
  UseGuards,
  Req,
  UseInterceptors,
  ClassSerializerInterceptor,
} from '@nestjs/common';
import { ApiBearerAuth, ApiResponse, ApiOperation } from '@nestjs/swagger';
import { PageRequest } from 'src/core/pagination.entity';
import { Roles, RoleType } from 'src/core/security';
import { AuthGuard } from '../../core/security/guards/auth.guard';
import { RolesGuard } from '../../core/security/guards/roles.guard';
import { LoggingInterceptor } from '../../core/security/interceptors/logging.interceptor';
import { UserDTO } from '../dtos/user.dto';
import { UserService } from '../services/user.service';
import { Request } from '../../core/request';

@Controller('api/admin/users')
//AuthGuard
//@UseGuards(RolesGuard)
@UseInterceptors(LoggingInterceptor, ClassSerializerInterceptor)
//@ApiBearerAuth()
export class UserController {
  logger = new Logger('UserController');

  constructor(private readonly userService: UserService) {}

  @Get('/')
  @Roles(RoleType.ADMIN)
  @ApiResponse({
    status: 200,
    description: 'List all users',
    type: UserDTO,
  })
  async getAllUsers(@Req() req: Request): Promise<UserDTO[]> {
    const sortField = '';
    const pageRequest: PageRequest = new PageRequest(1, 10, sortField);
    const [results, count] = await this.userService.findAndCount({
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

  @Post('/')
  @Roles(RoleType.ADMIN)
  @ApiResponse({
    status: 201,
    description: 'The record has been successfully created.',
    type: UserDTO,
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  async createUser(
    @Req() req: Request,
    @Body() userDTO: UserDTO,
  ): Promise<UserDTO> {
    userDTO.password = userDTO.login;
    const created = await this.userService.save(userDTO, req.user?.login, true);
    //HeaderUtil.addEntityCreatedHeaders(req.res, 'User', created.id);
    return created;
  }

  @Put('/')
  @Roles(RoleType.ADMIN)
  @ApiResponse({
    status: 200,
    description: 'The record has been successfully updated.',
    type: UserDTO,
  })
  async updateUser(
    @Req() req: Request,
    @Body() userDTO: UserDTO,
  ): Promise<UserDTO> {
    const userOnDb = await this.userService.find({
      where: { login: userDTO.login },
    });
    let updated = false;
    if (userOnDb && userOnDb.id) {
      userDTO.id = userOnDb.id;
      updated = true;
    } else {
      userDTO.password = userDTO.login;
    }
    const createdOrUpdated = await this.userService.update(
      userDTO,
      req.user?.login,
    );
    /*     if (updated) {
      HeaderUtil.addEntityUpdatedHeaders(req.res, 'User', createdOrUpdated.id);
    } else {
      HeaderUtil.addEntityCreatedHeaders(req.res, 'User', createdOrUpdated.id);
    } */
    return createdOrUpdated;
  }

  @Get('/:login')
  @Roles(RoleType.ADMIN)
  @ApiResponse({
    status: 200,
    description: 'The found record',
    type: UserDTO,
  })
  async getUser(@Param('login') loginValue: string): Promise<UserDTO> {
    return await this.userService.find({ where: { login: loginValue } });
  }

  @Delete('/:login')
  @Roles(RoleType.ADMIN)
  @ApiResponse({
    status: 204,
    description: 'The record has been successfully deleted.',
    type: UserDTO,
  })
  async deleteUser(
    @Req() req: Request,
    @Param('login') loginValue: string,
  ): Promise<UserDTO> {
    /*     HeaderUtil.addEntityDeletedHeaders(req.res, 'User', loginValue); */
    const userToDelete = await this.userService.find({
      where: { login: loginValue },
    });
    return await this.userService.delete(userToDelete);
  }
}
