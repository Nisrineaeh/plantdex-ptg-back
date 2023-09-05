import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PlantsModule } from './plants/plants.module';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [ConfigModule.forRoot({envFilePath:[`.env`]}),
    PlantsModule, TypeOrmModule.forRoot({type: 'postgres', 
                                        host: 'localhost',
                                        port: +(process.env.DB_PORT),
                                        username: process.env.DB_USERNAME,
                                        password: process.env.DB_PASSWORD,
                                        database: process.env.DB_NAME,
                                        autoLoadEntities: true, //auto load des entités + besoin de rentrée les entitée à la main
                                        synchronize: false,
                                        logging: true,
})],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
