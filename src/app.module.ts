import { Module } from '@nestjs/common';
import { DatabaseModule } from './database/database.module';
import { AuthModule } from './modules/auth/auth.module';
import { CategoriesModule } from './modules/categories/categories.module';

@Module({
  imports: [DatabaseModule, AuthModule, CategoriesModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
