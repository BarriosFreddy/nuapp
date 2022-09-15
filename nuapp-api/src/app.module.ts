import { Module } from '@nestjs/common';
import { ThrottlerModule } from '@nestjs/throttler';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BillingModule } from './billing/billing.module';
import { MongooseModule } from '@nestjs/mongoose';
import 'dotenv/config';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user-account/user.module';
const { DATABASE_USER, DATABASE_PASSWORD, DATABASE_NAME } = process.env;
const uri = `mongodb://${DATABASE_USER}:${DATABASE_PASSWORD}@cluster0-shard-00-00.w0wjd.mongodb.net:27017,cluster0-shard-00-01.w0wjd.mongodb.net:27017,cluster0-shard-00-02.w0wjd.mongodb.net:27017/${DATABASE_NAME}?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true&w=majority`;

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'client'),
      exclude: ['/api*'],
    }),
    TypeOrmModule.forRoot({
      url: uri,
      type: 'mongodb',
      database: DATABASE_NAME,
      entities: [__dirname + '/**/entities/*.entity.js'],
      ssl: true,
      useUnifiedTopology: true,
      useNewUrlParser: true,
    }),
    /*  MongooseModule.forRoot(uri), */
    ThrottlerModule.forRoot({
      ttl: 60 * 30,
      limit: 1000,
    }),
    BillingModule,
    UserModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
