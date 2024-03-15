import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { UserModule } from '@modules/user/user.module';
import { options } from './config';
import { STRATEGIES } from './strategies';
import { GUARDS } from './guards';
import { PsychologistService } from '@modules/psychologist/psychologist.service';
import { ProfileService } from '@modules/profile/profile.service';

@Module({
  providers: [
    AuthService,
    ...STRATEGIES,
    ...GUARDS,
    PsychologistService,
    ProfileService,
  ],
  controllers: [AuthController],
  imports: [PassportModule, JwtModule.registerAsync(options()), UserModule],
})
export class AuthModule {}
