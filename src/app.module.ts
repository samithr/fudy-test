import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { configService } from './config/config.service';

@Module({
  imports: [TypeOrmModule.forRoot({type: 'postgres',  /*this need to get from a service - configService.getTypeOrmConfig()*/
                                  host: 'localhost',
                                  port: 5432,
                                  username: 'postgres',
                                  password: '1qaz@WSX',
                                  database: 'FudyTestDb'}),
            UserModule,
            AuthModule]
})
export class AppModule {}