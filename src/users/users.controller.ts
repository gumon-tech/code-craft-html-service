import { Controller, Post, Body } from '@nestjs/common';
import { UsersService } from './users.service';
import { ApiOperation } from '@nestjs/swagger';
import { RegisterUserDto } from './dto/register-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { ChangePasswordDto } from './dto/change-password.dto';
import { ResetPasswordDto } from './dto/reset-password.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('/register')
  @ApiOperation({ summary: 'สมัครสมาชิก' })
  register(@Body() registerUserDto: RegisterUserDto) {
    return this.usersService.register(registerUserDto);
  }

  @Post('/login')
  @ApiOperation({ summary: 'login' })
  login(@Body() data: LoginUserDto) {
    return this.usersService.login(data);
  }

  @Post('/change_password')
  @ApiOperation({ summary: 'เปลียนรหัสผ่าน' })
  changePassword(@Body() data: ChangePasswordDto) {
    return this.usersService.changePassword(data);
  }

  @Post('/reset_password')
  @ApiOperation({ summary: 'ลืมรหัสผ่าน' })
  resetPassword(@Body() data: ResetPasswordDto) {
    return this.usersService.resetPassword(data);
  }
}
