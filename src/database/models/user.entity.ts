import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

export enum Gender {
  MALE = 'MALE',
  FEMALE = 'FEMALE',
  OTHER = 'OTHER',
}

export enum Roles {
  ADMIN = 'ADMIN',
  SELLER = 'SELLER',
  CUSTOMER = 'CUSTOMER',
}

@Entity()
export class Users {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'first_name', length: 50, nullable: false })
  firstName: string;

  @Column({ name: 'last_name', length: 50, nullable: false })
  lastName: string;

  @Column({ name: 'gender', type: 'enum', enum: Gender, default: Gender.OTHER })
  gender: Gender;

  @Column({ name: 'age', type: 'int', nullable: true })
  age: number;

  @Column({ name: 'email', length: 200, nullable: false })
  email: string;

  @Column({ name: 'password', length: 20, nullable: false })
  password: string;

  @Column({ name: 'phone', length: 15, nullable: true })
  phone: string;

  @Column({ name: 'address', type: 'varchar', nullable: true })
  address: string;

  @Column({ name: 'favorite_products', type: 'uuid' })
  favoriteProducts: string[];

  @Column({ name: 'avatar', length: 200, nullable: true })
  avatar: string;

  @Column({ name: 'cart', type: 'uuid' })
  cart: string[];

  @Column({ name: 'role', type: 'enum', enum: Roles, default: Roles.CUSTOMER })
  role: Roles;

  @CreateDateColumn({ name: 'created_at', type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamp' })
  updatedAt: Date;
}
