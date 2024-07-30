import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from './schemas/user.schema';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from './dto/create-user.dto';
@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
  ) {}

  async findAll() {
    try {
      const users = await this.userModel.find().select('name email').exec();
      if (users.length === 0) {
        throw new NotFoundException('No users found');
      }
      return users.map(user => ({
        name: user.name,
        email: user.email,
      }));
    } catch (error) {
      console.error('Error fetching users:', error);
      throw new BadRequestException('Could not fetch users');
    }
  }
  

  async findOneByEmail(email: string) {
    try {
      const user = await this.userModel.findOne({ email }).select('name email').exec();

      if (!user) {
        throw new NotFoundException(`User with email ${email} not found`);
      }

      return {
        name: user.name,
        email: user.email,
      };
    } catch (error) {
      console.error('Error fetching user by email:', error);

      if (error instanceof NotFoundException) {
        throw error;
      }

      throw new BadRequestException('Could not fetch user');
    }
  }



  async create(createUserDto: CreateUserDto) {
    try {
      const existingUser = await this.userModel.findOne({ email: createUserDto.email }).exec();
      if (existingUser) {
        throw new BadRequestException('User with this email already exists');
      }

      const hashedPassword = await bcrypt.hash(createUserDto.password, 10);
      
      const newUser = new this.userModel({
        ...createUserDto,
        password: hashedPassword,
      });

      const result = await newUser.save();

      return { msg: 'User created', user: result };
    } catch (error) {
      console.error('Error creating user:', error);
      throw new BadRequestException('Error creating user');
    }
  }




  async validateUser(email: string, password: string): Promise<UserDocument | null> {
    try {
      const user = await this.userModel.findOne({ email }).exec();
      if (!user) {
        return null;
      }

      const isPasswordMatching = await bcrypt.compare(password, user.password);
      if (!isPasswordMatching) {
        return null;
      }

      return user;
    } catch (error) {
      throw new BadRequestException('Error validating user');
    }
  }

 /* async update(updatedUser: { name?: string; email?: string }) {
    try {
      const user = await this.userModel.findOneAndUpdate(
        { email: updatedUser.email },
        updatedUser,
        { new: true, runValidators: true }
      ).exec();
      if (!user) {
        throw new NotFoundException('User not found');
      }
      return user;
    } catch (error) {
      throw new BadRequestException('Error updating user');
    }
  }
*/


  // async delete(email: string) {
  //   try {
  //     const user = await this.userModel.findOneAndDelete({ email }).exec();
  //     if (!user) {
  //       throw new NotFoundException('User not found');
  //     }
  //     return { msg: 'User deleted', user };
  //   } catch (error) {
  //     throw new BadRequestException('Error deleting user');
  //   }
  // }
}