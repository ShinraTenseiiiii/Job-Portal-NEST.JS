import { Injectable, BadRequestException, ConflictException, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Admin, AdminDocument } from './schemas/admin.schema';
import { CreateAdminDto } from './dto/create-admin.dto';
import { Job, JobDocument, JobSchema } from '../jobs/schemas/jobs.schema'; 
import * as bcrypt from 'bcrypt';

@Injectable()
export class AdminsService {
  constructor(
    @InjectModel(Admin.name) private readonly adminModel: Model<AdminDocument>,
   // @InjectModel(Job.name) private readonly jobModel: Model<JobDocument>, // TODO
  ) {}

  // Register a new admin
  async register(createAdminDto: CreateAdminDto): Promise<AdminDocument> {
    try {
      // Check if an admin with the same username already exists
      const existingAdmin = await this.adminModel.findOne({ username: createAdminDto.username }).exec();
      if (existingAdmin) {
        throw new ConflictException('Admin with this username already exists');
      }

      // Hash the admin's password
      const hashedPassword = await bcrypt.hash(createAdminDto.password, 10);

      // Create a new admin with the hashed password
      const createdAdmin = new this.adminModel({
        ...createAdminDto,
        password: hashedPassword,
      });

      return await createdAdmin.save();
    } catch (error) {
      console.error('Error registering admin:', error);
      // Throw a BadRequestException if an error occurs
      throw new BadRequestException('Error registering admin');
    }
  }

  // Create a new job
//   async createJob(createJobDto: CreateJobDto): Promise<JobDocument> {
//     try {
//       const createdJob = new this.jobModel(createJobDto);
//       return await createdJob.save();
//     } catch (error) {
//       console.error('Error creating job:', error);
//       throw new BadRequestException('Error creating job');
//     }
//   }

  // Delete a job by ID
//   async deleteJob(jobId: string): Promise<{ msg: string }> {
//     try {
//       const deletedJob = await this.jobModel.findByIdAndDelete(jobId);
//       if (!deletedJob) {
//         throw new NotFoundException('Job not found');
//       }
//       return { msg: 'Job deleted successfully' };
//     } catch (error) {
//       console.error('Error deleting job:', error);
//       throw new BadRequestException('Error deleting job');
//     }
//   }

}
