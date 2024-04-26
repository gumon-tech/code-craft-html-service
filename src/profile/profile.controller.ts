import {
  Controller,
  Get,
  Post,
  Body,
  UseInterceptors,
  UploadedFile,
  UseGuards,
  Req,
} from '@nestjs/common';
import { ProfileService } from './profile.service';
import { CreateProfileDto } from './dto/create-profile.dto';
import {
  ApiBearerAuth,
  ApiBody,
  ApiConsumes,
  ApiOperation,
} from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { LoginGuard } from 'src/guards/login.guard';

@Controller('profile')
export class ProfileController {
  constructor(private readonly profileService: ProfileService) {}

  @ApiOperation({ summary: 'update profile ที่ login อยู่' })
  @ApiBearerAuth()
  @UseGuards(LoginGuard)
  @Post()
  create(@Body() createProfileDto: CreateProfileDto, @Req() req) {
    const userId = req?.user?.userId || '';
    return this.profileService.create(createProfileDto, userId);
  }

  @ApiOperation({ summary: 'get myProfile ที่ login อยู่' })
  @ApiBearerAuth()
  @UseGuards(LoginGuard)
  @Get()
  myProfile(@Req() req) {
    const userId = req?.user?.userId || '';
    return this.profileService.getProfile(userId);
  }

  @ApiBearerAuth()
  @Post('image')
  @ApiOperation({ summary: 'Uploads a image profile' })
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FileInterceptor('file'))
  @ApiBody({
    required: true,
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  async uploadImgFile(@UploadedFile() file, @Req() req) {
    const fileName = file.originalname;
    const fileContent = file.buffer;
    const userId = req?.user?.userId || '';
    const url = await this.profileService.uploadFile(
      userId,
      fileName,
      fileContent,
    );
    return {
      statusCode: 200,
      message: 'Successful',
      data: {
        fileName: fileName,
        url: url,
      },
    };
  }
}
