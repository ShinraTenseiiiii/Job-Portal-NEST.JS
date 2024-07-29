import { Controller, Post, Body, Get, Param } from '@nestjs/common';
import { JobsService } from './jobs.service';
import { JobDocument } from './schemas/jobs.schema';




@Controller('jobs')
export class JobsController {
  constructor(private readonly jobsService: JobsService) {}

  @Post('create')
  async create(@Body() createJobDto: any): Promise<JobDocument> {
    return this.jobsService.create(createJobDto);
  }

  @Get(':jobId')
  async getJob(@Param('jobId') jobId: string): Promise<JobDocument> {
    return this.jobsService.findOne(jobId);
  }

  @Get()
  async getAllJobs(): Promise<JobDocument[]> {
    return this.jobsService.findAll();
  }
}