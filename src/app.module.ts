import { Module } from '@nestjs/common';

import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UserModule } from './user/user.module';
import { CartModule } from './cart/cart.module';
import { RoleModule } from './role/role.module';
import { SizeModule } from './size/size.module';
import { SuitabilityModule } from './suitability/suitability.module';
import { ProducttypeModule } from './producttype/producttype.module';
import { ColorModule } from './color/color.module';
import { AuthenticationModule } from './authentication/authentication.module';
import { ProductModule } from './product/product.module';
import { StatusModule } from './status/status.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: [`.env`],
    }),

    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {
        return {
          type: 'postgres',
          entities: [__dirname + '/entities/*.entity{.ts,.js}'],
          autoLoadEntities: false,
          synchronize: true,
          host: configService.get('DB_HOST'),
          port: configService.get('DB_PORT'),
          username: configService.get('DB_USERNAME'),
          password: configService.get('DB_PASSWORD'),
          database: configService.get('DB_DATABASE'),
        };
      },
    }),
    ConfigModule,
    UserModule,
    CartModule,
    RoleModule,
    SizeModule,
    SuitabilityModule,
    ProducttypeModule,
    ColorModule,
    AuthenticationModule,
    ProductModule,
    StatusModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
