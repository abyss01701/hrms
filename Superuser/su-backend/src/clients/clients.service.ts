import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
import * as argon2 from 'argon2';
import * as crypto from 'crypto';
import { Client } from './client.entity';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class ClientsService {
  constructor(
    @InjectRepository(Client)
    private readonly clientRepository: Repository<Client>,
    private readonly httpService: HttpService,
  ) {}

  async createClient(payload: any) {
    // Generate password
    const tempPassword = crypto.randomBytes(8).toString('base64');
    const hashedPassword = await argon2.hash(tempPassword);

    // Generate Admin ID
    const adminID = uuidv4();

    const newClient = this.clientRepository.create({
      clientName: payload.clientName,
      plan: payload.plan,
      status: payload.status,
      domain: payload.domain,
      apiKey: payload.apiKey,
      employees: payload.employees,
      adminID,
      adminEmail: payload.adminEmail,
      adminPasswordHash: hashedPassword,
      moduleName: payload.moduleName,
      moduleFeatures: payload.moduleFeatures,
      forcePasswordChange: true,
    });

    const saveRecord = await this.clientRepository.save(newClient);

    // Notify client instance → create its admin user
      await this.callClientInstance(
        payload.domain,
        payload.apiKey,
        'onboard-admin',
        {
          adminID,
          adminEmail: payload.adminEmail,
          tempPassword,
          modules: payload.moduleName
        }
      );

    return {
      ...saveRecord,
      tempPassword, // returned only once during onboarding
    };
  }

  //call tenant instance
  private async callClientInstance(domain: string, apiKey: string, path: string, data: any) {
  const url = `https://${domain}/internal/${path}`;

  try {
    const res = await firstValueFrom(
      this.httpService.post(url, data, {
        headers: { 'x-api-key': apiKey }
      })
    );
    return res.data;
  } catch (error) {
    console.error("Tenant API Error:", error.response?.data || error.message);
    throw new Error("Failed communicating with client instance");
  }
}


  async getTotalClients() {
    const clients = await this.clientRepository.find();

    return clients.map((c) => ({
      clientID: c.clientID,
      clientName: c.clientName,
      domain: c.domain,
      status: c.status,
      employees: c.employees,
      moduleName: c.moduleName,
      plan: c.plan,
      adminEmail: c.adminEmail,
      createdAt: c.createdAt,
    }));
  }

  // Placeholder implementations — replace later with DB logic
  getClientStatus() {
    return 'Client status';
  }

  getActiveModules() {
    return 'Active modules list';
  }

  async deleteClient(id: string, mode: string) {
    const client = await this.clientRepository.findOne({ where: { clientID: id } });

    if (!client) {
      return { message: 'Client not found', success: false };
    }

    if (mode === 'offload') {
      client.status = 'offloaded';
      await this.clientRepository.save(client);

      return { message: 'Client offloaded successfully', success: true };
    }

    if (mode === 'delete') {
      await this.clientRepository.delete({ clientID: id });

      return { message: 'Client deleted permanently', success: true };
    }

    // Suspend mode
    client.status = 'suspended';
    await this.clientRepository.save(client);

    return { message: 'Client suspended', success: true };
  }

  async updateStatus(id: string, status: string) {
    const client = await this.clientRepository.findOne({
      where: { clientID: id },
    });

    if (!client) {
      return { success: false, message: 'Client not found' };
    }

    client.status = status;
    await this.clientRepository.save(client);

    return { success: true, message: `Client status updated to ${status}` };
  }

  async updateModules(id: string, modules: string[]) {
    const client = await this.clientRepository.findOne({where: { clientID: id },
    });

    if (!client) {
      return { success: false, message: 'Client not found' };
    }

    client.moduleName = modules;
    await this.clientRepository.save(client);

        await this.callClientInstance(
        client.domain,
        client.apiKey,
        'update-modules',
        { modules }
      );


    return { success: true, message: 'Modules updated', modules };
  }

  async getStats() {
    const clients = await this.clientRepository.find();

    const activeCompanies = clients.length;
    const activeUsers = clients.reduce((sum, client) => {
      return sum + (client.employees || 0);
    }, 0);

    return {
      activeCompanies,
      activeUsers,
    };
  }
}
