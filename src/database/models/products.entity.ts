import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { Transform } from 'class-transformer';

@Entity()
export class Products {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'name', length: 150, nullable: false })
  name: string;

  @Column({ name: 'category_id', type: 'uuid', nullable: false })
  categoryId: string;

  @Column({ name: 'alcohol', type: 'decimal', scale: 6, precision: 13 })
  @Transform(({ value }) => Math.ceil(Number(value)))
  alcohol: number;

  @Column({ name: 'volume', type: 'decimal', scale: 6, precision: 13 })
  @Transform(({ value }) => Math.ceil(Number(value)))
  volume: number;

  @Column({ name: 'ph', type: 'decimal', scale: 6, precision: 13 })
  @Transform(({ value }) => Math.ceil(Number(value)))
  ph: number;

  @Column({
    name: 'titratable_acidity',
    type: 'decimal',
    scale: 6,
    precision: 13,
  })
  @Transform(({ value }) => Math.ceil(Number(value)))
  titratableAcidity: number;

  @Column({ name: 'price', type: 'decimal', scale: 6, precision: 13 })
  @Transform(({ value }) => Math.ceil(Number(value)))
  price: number;

  @Column({ name: 'is_sale', type: 'boolean', default: false })
  isSale: boolean;

  @Column({
    name: 'sale_price',
    type: 'decimal',
    scale: 6,
    precision: 13,
    nullable: true,
  })
  @Transform(({ value }) => Math.ceil(Number(value || 0)))
  salePrice: number;

  @Column({
    name: 'description',
    type: 'varchar',
    nullable: true,
    length: 1000,
  })
  description: string;

  @Column({ name: 'image', nullable: true })
  image: string;

  @CreateDateColumn({ name: 'created_at', type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamp' })
  updatedAt: Date;
}
