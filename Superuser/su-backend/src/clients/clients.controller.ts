import {
  Controller,
  Post,
  Get,
  Delete,
  Patch,
  Body,
  Param,
  Query,
} from '@nestjs/common';
import { ClientsService } from './clients.service';
import { CreateClientDto } from './dto/create-client.dto';

@Controller('clients')
export class ClientsController {
  constructor(private readonly clientService: ClientsService) {}

  @Post('onboard')
  createClient(@Body() createClientDto: CreateClientDto) {
    return this.clientService.createClient(createClientDto);
  }

  @Post('total')
  getTotalClients() {
    return this.clientService.getTotalClients();
  }

  @Post('client-status')
  getClientStatus() {
    return this.clientService.getClientStatus();
  }

  @Post('active-modules')
  getActiveModules() {
    return this.clientService.getActiveModules();
  }

  @Get()
  getAllClients() {
    return this.clientService.getTotalClients();
  }

  @Get('status')
  getStatus() {
    return this.clientService.getClientStatus();
  }

  @Get('modules')
  getModules() {
    return this.clientService.getActiveModules();
  }

  @Delete(':id')
  deleteClient(
    @Param('id') id: string,
    @Query('mode') mode: string,
  ) {
    return this.clientService.deleteClient(id, mode);
  }

  @Patch(':id/status')
  updateStatus(
    @Param('id') id: string,
    @Body('status') status: string,
  ) {
    return this.clientService.updateStatus(id, status);
  }

  @Patch(':id/modules')
  updateModules(
    @Param('id') id: string,
    @Body('modules') modules: string[],
  ) {
    return this.clientService.updateModules(id, modules);
  }

  @Get('stats')
  getStats() {
    return this.clientService.getStats();
  }
}
