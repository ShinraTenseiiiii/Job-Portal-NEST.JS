import { Controller, Post, Delete, Body, Param, NotFoundException } from '@nestjs/common';
import { AdminsService } from './admins.service';
import { AdminDocument } from './schemas/admin.schema';

import { CreateAdminDto } from './dto/create-admin.dto';
import { CreateJobDto } from '../jobs/dto/create-job.dto'; // Import CreateJobDto

@Controller('admins')
export class AdminsController {
  constructor(private readonly adminsService: AdminsService) {}

  @Post('register')
  async register(@Body() createAdminDto: CreateAdminDto): Promise<AdminDocument> {
    return this.adminsService.register(createAdminDto);
  }


  // @Post('createJobs')
  // async createJob(@Body() createJobDto: CreateJobDto): Promise<{ msg: string }> {
  //   try {
  //     const job = await this.adminsService.createJob(createJobDto);
  //     return { msg: 'created'};
  //   } catch (error) {
  //     throw new NotFoundException('Error creating job');
  //   }
  // }

  // Delete a job by ID
//   @Delete('jobs/:id')
//   async deleteJob(@Param('id') jobId: string): Promise<{ msg: string }> {
//     try {
//       return await this.adminsService.deleteJob(jobId);
//     } catch (error) {
//       throw new NotFoundException('Error deleting job');
//     }
//   }


}
