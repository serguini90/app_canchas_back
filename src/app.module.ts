import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { EnvConfiguration } from './config/env.config';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { MailerModule } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { TypeOrmModule } from '@nestjs/typeorm';
import { obtenerEntidades } from './commons/entidades.config';
import { UsuarioController } from './controllers/usuario/usuario.controller';
import { NotificacionService } from './services/notificacion.service';
import { UsuarioService } from './services/usuario.service';
import { JwtStrategy } from './strategies/jwt.strategy';
import { CanchaService } from './services/cancha.service';
import { CanchaHorarioService } from './services/cancha-horario.service';
import { ReservaService } from './services/reserva.service';
import { ListaMedioPagoService } from './services/lista-medio-pago.service';
import { ListaMedioPagoController } from './controllers/lista-medio-pago/lista-medio-pago.controller';
import { CanchaHorarioController } from './controllers/cancha-horario/cancha-horario.controller';
import { CanchaController } from './controllers/cancha/cancha.controller';
import { ReservaController } from './controllers/reserva/reserva.controller';

@Module({
  imports: [
    ConfigModule.forRoot({
        isGlobal: true,
        load: [ EnvConfiguration ]
      }),
      PassportModule.register({ defaultStrategy: 'jwt' }),
      JwtModule.registerAsync({
        imports: [ConfigModule],
        inject: [ConfigService],
        useFactory: (config: ConfigService) => ({
          secret: config.get('JWT_SECRET'),
          signOptions: {
            expiresIn: config.get('EXPIRES_IN')
          },
        }),
      }),
      MailerModule.forRootAsync({
        imports: [ConfigModule],
        inject: [ConfigService],
        useFactory: (config: ConfigService) => ({
          transport: {
            host: 'smtp-relay.sendinblue.com',
            auth: {
              user: config.get('MAIL_USER'),
              pass: config.get('MAIL_API_KEY'),
            },
          },
          template: {
            dir: process.cwd() + '/templates/',
            adapter: new HandlebarsAdapter(),
            options: {
              strict: true,
            },
          }
        })
      }),
      TypeOrmModule.forRootAsync({
        imports: [ConfigModule],
        useFactory: (configService: ConfigService) => ({
          type: 'mysql',
          host: configService.get<string>('DATABASE_HOST'),
          port: parseInt(configService.get<string>('DATABASE_PORT')),
          username: configService.get<string>('DATABASE_USER'),
          password: configService.get<string>('DATABASE_PASSWORD'),
          database: configService.get<string>('DATABASE_NAME'),
          entities: obtenerEntidades()
        }),
        inject: [ConfigService],
      }),
      TypeOrmModule.forFeature(obtenerEntidades()),
  ],
  controllers: [UsuarioController,ListaMedioPagoController, CanchaHorarioController, CanchaController, ReservaController],
  providers: [NotificacionService,UsuarioService,JwtStrategy, CanchaService, CanchaHorarioService, ReservaService, ListaMedioPagoService]
})
export class AppModule {}