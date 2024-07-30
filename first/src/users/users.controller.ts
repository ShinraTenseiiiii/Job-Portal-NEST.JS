import { Body, Controller, Get, Post, Patch, Delete, Query, Res, HttpStatus } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './schemas/user.schema';
import { CreateUserDto } from './dto/create-user.dto';
import { AuthService } from '../auth/auth.service';
import { Response } from 'express'; 

@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly authService: AuthService
  ) {}

  @Get()
  async findAll() {
    return this.usersService.findAll();
  }

  @Get('by-email') //users/by-email?email=user@example.com
  async findOneByEmail(@Query('email') email: string) {
    return this.usersService.findOneByEmail(email);
  }

  @Post()
  async create(@Body() user: CreateUserDto) {
    return this.usersService.create(user);
  }

  @Post('login')
  async login(@Body() { email, password }: { email: string; password: string }, @Res() res: Response) {
    const user = await this.usersService.validateUser(email, password);

    if (!user) {
      return res.status(HttpStatus.UNAUTHORIZED).json({ message: 'Invalid credentials' });
    }

    const { accessToken } = await this.authService.login(email, password);
    
    res.setHeader('Authorization', `Bearer ${accessToken}`);
    return res.status(HttpStatus.OK).json({ message: 'Login successful' });
  }

  @Patch() 
  async update(@Body() userUpdate: { name?: string; email?: string }) {
    // Update logic here
  }

  @Delete() 
  async delete(@Body() user: { email: string }) {
    // Delete logic here
  }
}
