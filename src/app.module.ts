import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { ItemModule } from './item/item.module';
import { AuthModule } from './auth/auth.module';
import { AppController } from './app.controller';

@Module({
  imports: [UserModule, ItemModule, AuthModule],
  controllers: [AppController],
})
export class AppModule {}
