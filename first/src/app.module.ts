import { Module,NestModule, MiddlewareConsumer } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from './users/users.module';
import { AppService } from './app.service';
import { AppController } from './app.controller';
import { AuthModule } from './auth/auth.module';
import { AdminsModule } from './admins/admins.module';
import { JobsModule } from './jobs/jobs.module';
import { UserMiddleware } from './middleware/user.middleware';

@Module({
  imports: [MongooseModule.forRoot('mongodb+srv://Joydeep:FeMH83FYwpJuuJTq@sentient.m9yxcx5.mongodb.net/fridayNest'),UsersModule, AuthModule, AdminsModule, JobsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(UserMiddleware)
      .forRoutes('jobs/create'); // Apply middleware to specific routes
  }
}