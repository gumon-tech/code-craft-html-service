import { BadRequestException, Injectable } from '@nestjs/common';
import { RegisterUserDto } from './dto/register-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { ConnectionName } from 'src/database/database.module';
import { UserDocument } from 'src/database/schemas/user.schema';
import { CombinedPluginModel } from 'src/database/database.interface';
import { ProfileDocument } from 'src/database/schemas/profile.schema';
import * as bcrypt from 'bcrypt';
import { LoginUserDto } from './dto/login-user.dto';
import { JwtService } from '@nestjs/jwt';
import { ChangePasswordDto } from './dto/change-password.dto';
import { ResetPasswordDto } from './dto/reset-password.dto';

@Injectable()
export class UsersService {
  constructor(
    //dataBase
    @InjectModel(UserDocument.name, ConnectionName.database)
    private readonly userDocModel: CombinedPluginModel<UserDocument>,

    @InjectModel(ProfileDocument.name, ConnectionName.database)
    private readonly profileDocModel: CombinedPluginModel<ProfileDocument>,

    private jwtService: JwtService,
  ) {}

  async register(registerUserDto: RegisterUserDto) {
    const { username, password, confirmPassword, firstName, lastName } =
      registerUserDto;

    // แฮชรหัสผ่าน
    const hashedPassword = await bcrypt.hash(password, 10);

    if (password !== confirmPassword) {
      throw new BadRequestException('รหัสผ่านและยืนยันรหัสผ่านไม่ตรงกัน');
    }

    const isUsername = await this.userDocModel.findOne({
      username: username,
    });

    if (isUsername) {
      throw new BadRequestException('มี Username นี้แล้วในระบบ');
    }

    const user = await this.userDocModel.create({
      username: username,
      password: hashedPassword,
    });

    const profile = await this.profileDocModel.create({
      userId: user._id,
      firstName: firstName,
      lastName: lastName,
    });

    return {
      userId: user._id,
      username: user.username,
      profile: profile,
    };
  }

  async login(loginUserDto: LoginUserDto) {
    const { username, password } = loginUserDto;

    const user = await this.userDocModel.findOne({
      username: username,
    });

    if (!user) {
      throw new BadRequestException('ไม่พบ user name ที่ระบุ');
    }

    const isCompare = await bcrypt.compare(password, user.password);
    if (!isCompare) {
      throw new BadRequestException('password ไม่ถูกต้อง');
    }

    // สร้าง Token
    const accessToken = await this.jwtService.signAsync({
      username: user.username,
      sub: user.id,
      userId: user.id,
      // secret: this.jwtSecretKey || '123',
    });

    // ส่ง Token กลับไปยังผู้ใช้
    return { access_token: accessToken };
  }

  async changePassword(data: ChangePasswordDto) {
    const { username, oldPassword, password, confirmPassword } = data;

    const user = await this.userDocModel.findOne({
      username: username,
    });

    if (!user) {
      throw new BadRequestException('ไม่พบ user name ที่ระบุ');
    }

    const isCompare = await bcrypt.compare(oldPassword, user.password);
    if (!isCompare) {
      throw new BadRequestException('password ไม่ถูกต้อง');
    }

    // แฮชรหัสผ่าน
    const hashedPassword = await bcrypt.hash(password, 10);

    if (password !== confirmPassword) {
      throw new BadRequestException('รหัสผ่านและยืนยันรหัสผ่านไม่ตรงกัน');
    }

    const updateUser = await this.userDocModel.findByIdAndUpdate(user._id, {
      password: hashedPassword,
    });

    return {
      userId: updateUser._id,
      username: updateUser.username,
    };
  }

  async resetPassword(data: ResetPasswordDto) {
    const { username, password, confirmPassword } = data;

    const user = await this.userDocModel.findOne({
      username: username,
    });

    if (!user) {
      throw new BadRequestException('ไม่พบ user name ที่ระบุ');
    }

    // แฮชรหัสผ่าน
    const hashedPassword = await bcrypt.hash(password, 10);

    if (password !== confirmPassword) {
      throw new BadRequestException('รหัสผ่านและยืนยันรหัสผ่านไม่ตรงกัน');
    }

    const updateUser = await this.userDocModel.findByIdAndUpdate(user._id, {
      password: hashedPassword,
    });

    return {
      userId: updateUser._id,
      username: updateUser.username,
    };
  }
}
