import { Module } from '@nestjs/common';
import { ThrottlerModule } from '@nestjs/throttler';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BillingController } from './controller/billingController.ts/billingController';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    ThrottlerModule.forRoot({
      ttl: 60 * 30,
      limit: 1000,
    }),
    UsersModule,
  ],
  controllers: [AppController, BillingController],
  providers: [AppService],
})
export class AppModule {}
