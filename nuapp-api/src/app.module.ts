import { Module } from '@nestjs/common';
import { ThrottlerModule } from '@nestjs/throttler';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BillingController } from './controller/billingController.ts/billingController';
import { ItemModule } from './item/item.module';
import { MongooseModule } from '@nestjs/mongoose';
import 'dotenv/config';
const { DATABASE_USER, DATABASE_PASSWORD, DATABASE_NAME } = process.env;
const uri = `mongodb://${DATABASE_USER}:${DATABASE_PASSWORD}@cluster0-shard-00-00.w0wjd.mongodb.net:27017,cluster0-shard-00-01.w0wjd.mongodb.net:27017,cluster0-shard-00-02.w0wjd.mongodb.net:27017/${DATABASE_NAME}?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true&w=majority`;
console.log({ uri });

@Module({
  imports: [
    MongooseModule.forRoot(uri),
    ThrottlerModule.forRoot({
      ttl: 60 * 30,
      limit: 1000,
    }),
    ItemModule,
  ],
  controllers: [AppController, BillingController],
  providers: [AppService],
})
export class AppModule {}
