import { Controller, Post, Body, Headers, Get } from '@nestjs/common';
import { InternalService } from './internal.service';

@Controller('internal')
export class InternalController {
  constructor(private readonly internalService: InternalService) {}

  @Post('onboard-admin')
  async onboardAdmin(
    @Body()
    body: {
      adminEmail: string;
      tempPassword: string;
      modules?: string[];
      adminName?: string;
    },
    @Headers('x-api-key') apiKey: string,
  ) {
    this.internalService.validateApiKey(apiKey);
    return this.internalService.onboardAdmin(body);
  }

  @Post('update-modules')
  async updateModules(
    @Body() body: { modules: string[] },
    @Headers('x-api-key') apiKey: string,
  ) {
    this.internalService.validateApiKey(apiKey);
    return this.internalService.updateModules(body.modules || []);
  }

  // (Optional) for client frontend to query enabled modules
  @Get('modules')
  async getEnabledModules() {
    return this.internalService.getEnabledModules();
  }
}
