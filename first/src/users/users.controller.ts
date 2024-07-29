import { Body, Controller, Get, Post, Patch, Delete, Query } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './schemas/user.schema';
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  async findAll() {
    return this.usersService.findAll();
  }

  @Get('by-email') //users/by-email?email=user@example.com
  async findOneByEmail(@Query('email') email: string) {
    return this.usersService.findOneByEmail(email);
  }

  @Post()
  async create(@Body() user: User) {
    return this.usersService.create(user);
  }

  @Post('login')
  async login(@Body() user: User) {
//return this.usersService.login(user); // TODO
  }

  @Patch() 
  async update(@Body() userUpdate: { name?: string; email?: string }) {
  }

  @Delete() 
  async delete(@Body() user: { email: string }) {
    
  }
}
