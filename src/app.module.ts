import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import * as mongoose from 'mongoose';
import { AppService } from './app.service';
import { CatsService } from './cats/cats.service';
import { CatsModule } from './cats/cats.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true, //mongodb 에서 indexing 을 하겠다는말
      useFindAndModify: true,
    }),
    CatsModule,
  ],
  controllers: [AppController],
  providers: [AppService, CatsService],
})
export class AppModule implements NestModule {
  private readonly isDev: boolean = process.env.MODE === 'dev' ? true : false;
  configure(consumer: MiddlewareConsumer) {
    // consumer.apply(LoggerMiddleware).forRoutes('*');
    mongoose.set('debug', this.isDev);
  }
}
