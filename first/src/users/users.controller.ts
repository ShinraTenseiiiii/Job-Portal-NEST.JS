import { Body, Controller, Get, Post, Patch, Delete, Query, Res, HttpStatus } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './schemas/user.schema';
import { CreateUserDto } from './dto/create-user.dto';
import { AuthService } from 'src/auth/auth.service';
import { Response } from 'express'; 
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService, private readonly authService: AuthService) {}

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
  async login(@Body() { email, password }: User, @Res() res: Response) {
    const user = await this.usersService.validateUser(email, password);
    if (!user) {
      return res.status(HttpStatus.UNAUTHORIZED).json({ message: 'Invalid credentials' });
    }

    const token = await this.authService.createToken(user._id.toString());
    res.setHeader('Authorization', `Bearer ${token}`);
    return res.status(HttpStatus.OK).json({ message: 'Login successful' });
  }

  @Patch() 
  async update(@Body() userUpdate: { name?: string; email?: string }) {
  }

  @Delete() 
  async delete(@Body() user: { email: string }) {
    
  }
}
