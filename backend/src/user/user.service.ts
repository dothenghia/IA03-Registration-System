import { Injectable, ConflictException, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from './user.schema';
import { RegisterDto } from './register.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async register(registerDto: RegisterDto): Promise<User> {
    const { username, email, password, phone } = registerDto;

    // Check if username already exists
    const existingUsername = await this.userModel.findOne({ username }).exec();
    if (existingUsername) {
      throw new ConflictException('Username already exists');
    }

    // Check if email already exists
    const existingEmail = await this.userModel.findOne({ email }).exec();
    if (existingEmail) {
      throw new ConflictException('Email already exists');
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new this.userModel({
      username,
      email,
      password: hashedPassword,
      phone
    });

    try {
      return await newUser.save();
    } catch (error) {
      throw new BadRequestException('Invalid input data');
    }
  }

  async findAll(): Promise<User[]> {
    return this.userModel.find().exec();
  }
}
