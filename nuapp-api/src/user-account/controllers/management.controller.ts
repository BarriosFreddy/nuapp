import { Controller, Get, Logger, UseInterceptors } from '@nestjs/common';
import { ApiResponse, ApiOperation, ApiExcludeEndpoint } from '@nestjs/swagger';
import { LoggingInterceptor } from '../../core/security/interceptors/logging.interceptor';

@Controller('management')
@UseInterceptors(LoggingInterceptor)
//@ApiUseTags('management-controller')
export class ManagementController {
  logger = new Logger('ManagementController');

  @ApiExcludeEndpoint()
  @Get('/info')
  @ApiResponse({
    status: 200,
    description: 'Check if the microservice is up',
  })
  info(): any {
    return {
      activeProfiles: 'dev',
      'display-ribbon-on-profiles': 'dev',
    };
  }
}
