import { Module } from '@nestjs/common';
import { AdminsService } from './admins.service';
import { AdminsController } from './admins.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Admin, AdminSchema } from './schemas/admin.schema';
import { JobsModule } from 'src/jobs/jobs.module';
@Module({
  imports: [MongooseModule.forFeature([{ name: Admin.name, schema: AdminSchema }]), ],
  providers: [AdminsService],
  controllers: [AdminsController]
})
export class AdminsModule {}
