import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { UsersService } from '../users/users.service';
import { HashService } from '../common/hash/hash.service';
import { TenantSettings } from '../tenant-setting/tenant-setting.entity';

@Injectable()
export class InternalService {
  constructor(
    private readonly usersService: UsersService,
    private readonly hashService: HashService,

    @InjectRepository(TenantSettings)
    private readonly settingsRepo: Repository<TenantSettings>,
  ) {}

  /** Shared check: validates x-api-key header against .env */
  validateApiKey(headerKey?: string) {
    const expected = process.env.SUPERADMIN_API_KEY;
    if (!expected || headerKey !== expected) {
      throw new UnauthorizedException('Invalid API key');
    }
  }

  /**
   * Called by SuperAdmin when a client is onboarded.
   * Body shape expected from SuperAdmin:
   * { adminEmail, tempPassword, modules?: string[], adminName?: string }
   */
  async onboardAdmin(payload: {
    adminEmail: string;
    tempPassword: string;
    modules?: string[];
    adminName?: string;
  }) {
    const { adminEmail, tempPassword, modules = [], adminName } = payload;

    // Only create if not already present – avoids duplicate admins
    let user = await this.usersService.findByEmail(adminEmail);
    if (!user) {
      const passwordHash = await this.hashService.hash(tempPassword);

      user = await this.usersService.createUser(
        adminName || 'Client Admin',
        adminEmail,
        passwordHash,
      );
      // role defaults to 'client-admin' from your entity :contentReference[oaicite:5]{index=5}
    }

    await this.upsertModules(modules);

    return {
      success: true,
      userId: user.id,
    };
  }

  /** Shared helper to insert/update module list */
  private async upsertModules(modules: string[]) {
    let settings = await this.settingsRepo.findOne({ where: {} });

    if (!settings) {
      settings = this.settingsRepo.create({ enabledModules: modules });
    } else {
      settings.enabledModules = modules;
    }

    await this.settingsRepo.save(settings);
    return settings;
  }

  /** Called when SuperAdmin updates modules */
  async updateModules(modules: string[]) {
    const settings = await this.upsertModules(modules);
    return {
      success: true,
      enabledModules: settings.enabledModules,
    };
  }

  /** Optional: tenant UI can call this to know what modules to show */
  async getEnabledModules() {
    const settings = await this.settingsRepo.findOne({ where: {} });
    return settings?.enabledModules ?? [];
  }
}
