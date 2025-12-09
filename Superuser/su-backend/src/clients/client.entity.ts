import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'clients' })
export class Client {
  @PrimaryGeneratedColumn('uuid')
  clientID: string;

  @Column()
  clientName: string;

  @Column()
  plan: string;

  @Column()
  status: string;

  @Column({ unique: true })
  domain: string;

  @Column({nullable:true})
  apiKey: string;

  @Column()
  employees: number;

  @Column('text', { array: true })
  moduleName: string[];

  @Column('text', { array: true, nullable: true })
  moduleFeatures?: string[];

  @Column()
  adminID: string;

  @Column({ unique: true })
  adminEmail: string;

  @Column({ default: true })
  forcePasswordChange: boolean;

  @Column()
  adminPasswordHash: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
