import { Module } from "@nestjs/common";
import { PassportModule } from "@nestjs/passport";
import { JwtModule } from "@nestjs/jwt";

import { UserModule } from "@user/user.module";

import { MailerModule } from "@nestjs-modules/mailer";
import { ConfigService } from "@nestjs/config";

import { GUARDS } from "./guards";
import { AuthService } from "./auth.service";
import { AuthController } from "./auth.controller";
import { STRATEGIES } from "./stategies";
import { getMailConfig, options } from "./config";

@Module({
  controllers: [AuthController],
  providers: [AuthService, ...STRATEGIES, ...GUARDS],
  imports: [
    UserModule,
    PassportModule,
    JwtModule.registerAsync(options()),
    MailerModule.forRootAsync({
      inject: [ConfigService],
      useFactory: getMailConfig,
    }),
  ],
})
export class AuthModule {}
