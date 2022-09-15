import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { config } from 'src/config';
import { Authority } from 'src/core/authority.entity';
import { JwtStrategy } from 'src/core/security/passport.jwt.strategy';
import { AccountController } from './controllers/account.controller';
import { ManagementController } from './controllers/management.controller';
import { PublicUserController } from './controllers/public.user.controller';
import { UserController } from './controllers/user.controller';
import { UserJWTController } from './controllers/user.jwt.controller';
import { User } from './entities/user.entity';
import { AuthService } from './services/auth.service';
import { UserService } from './services/user.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, Authority]),
    PassportModule,
    JwtModule.register({
      secret: config['jhipster.security.authentication.jwt.base64-secret'],
      signOptions: { expiresIn: '300s' },
    }),
  ],
  controllers: [
    UserController,
    PublicUserController,
    ManagementController,
    UserJWTController,
    AccountController,
  ],
  providers: [UserService, AuthService, JwtStrategy],
  exports: [UserService, AuthService],
})
export class UserModule {}
