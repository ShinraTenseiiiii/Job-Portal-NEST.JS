// src/jobs/jobs.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Job, JobDocument } from './schemas/jobs.schema';
import { CreateJobDto } from './dto/create-job.dto';
@Injectable()
export class JobsService {
  constructor(@InjectModel(Job.name) private jobModel: Model<JobDocument>) {}


  async create(createJobDto: CreateJobDto): Promise<JobDocument> {
    const createdJob = new this.jobModel(createJobDto);
    return  createdJob.save();
  }


  async findOne(jobId: string): Promise<JobDocument> {
    const job = await this.jobModel.findById(jobId);
    if (!job) {
      throw new NotFoundException('Job not found');
    }
    return job;
  }


  async findAll(): Promise<JobDocument[]> {
    return this.jobModel.find().exec();
  }
}
