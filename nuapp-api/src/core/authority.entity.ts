import { Entity, Column } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { BaseEntity } from './base.entity';

@Entity('authorities')
export class Authority extends BaseEntity {
  @ApiProperty({ example: 'ROLE_USER', description: 'User role' })
  @Column({ unique: true })
  name: string;
}
