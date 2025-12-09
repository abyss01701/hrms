import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'tenant_settings' })
export class TenantSettings {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  // List of enabled modules sent from SuperAdmin (e.g. ['Overview', 'Recruitment'])
  @Column('text', { array: true, default: '{}' })
  enabledModules: string[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
