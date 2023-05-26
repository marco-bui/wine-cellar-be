import { Transform } from 'class-transformer';
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

export enum TransactionStatus {
  SUCCESS = 'SUCCESS',
  CANCELED = 'CANCELED',
  PENDING = 'PENDING',
  FAILED = 'FAILED',
}

@Entity()
export class Transactions {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'user_id', type: 'uuid', nullable: false })
  userId: string;

  @Column({ name: 'product_id', type: 'uuid', nullable: false })
  productId: string;

  @Column({ name: 'total_price', type: 'decimal', scale: 6, precision: 13 })
  @Transform(({ value }) => Math.ceil(Number(value)))
  totalPrice: number;

  @Column({ name: 'phone', length: 15, nullable: true })
  phone: string;

  @Column({ name: 'address', type: 'varchar', nullable: true })
  address: string;

  @Column({
    name: 'status',
    type: 'enum',
    enum: TransactionStatus,
    default: TransactionStatus.PENDING,
  })
  status: TransactionStatus;

  @CreateDateColumn({ name: 'created_at', type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamp' })
  updatedAt: Date;
}
