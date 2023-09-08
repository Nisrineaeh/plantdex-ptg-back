import { MiddlewareConsumer, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PlantsModule } from './plants/plants.module';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MulterModule } from '@nestjs/platform-express';
import { UsersModule } from './users/users.module';


import * as multer from 'multer';
import { User } from './users/entities/user.entity';
import { Plant } from './plants/entities/plant.entity';
import* as  express from 'express';


@Module({
  imports: [ConfigModule.forRoot({envFilePath:[`.env`]}),
    PlantsModule, TypeOrmModule.forRoot({type: 'postgres', 
                                        host: 'localhost',
                                        port: +(process.env.DB_PORT),
                                        username: process.env.DB_USERNAME,
                                        password: process.env.DB_PASSWORD,
                                        database: process.env.DB_NAME,
                                        entities: [User, Plant], 
                                        // autoLoadEntities: true,
                                        synchronize: false,
                                        logging: true,
}),
          MulterModule.register({
            storage: multer.diskStorage({
              destination:'./uploads',
              filename : (req, file, cb) =>{
                const nameFile = `${Date.now().toString()}-${Math.round(Math.random() * 1E9).toString()}.${file.mimetype.split('/')[1]}`;
                cb(null, nameFile);
              }
            })
            
          }),
          
          UsersModule,
          
          ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(express.static('static/uploads')).forRoutes('uploads/*');
  }
}