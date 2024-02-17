import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';


@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal:true,
      envFilePath:[".env.local"]
    }),
    MongooseModule.forRootAsync({
      imports:[ConfigModule],
      useFactory:(configService:ConfigService) => ({uri :configService.get("MONGO_URI")}),
      inject:[ConfigService]
    }),
    UsersModule
  ],
 
})
export class AppModule {}
