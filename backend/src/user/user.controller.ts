import { Controller, Post, Get, Body, HttpCode, HttpStatus } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) { }

  @Post('register')
  @HttpCode(HttpStatus.CREATED)
  async register(@Body() registerDto: { email: string; password: string }) {
    const user = await this.userService.register(registerDto.email, registerDto.password);
    return { message: `User registered successfully with email ${user.email}` };
  }

  @Get('all')
  @HttpCode(HttpStatus.OK)
  async getAllUsers() {
    const users = await this.userService.findAll();
    return users.map(user => ({ email: user.email, createdAt: user.createdAt }));
  }
}