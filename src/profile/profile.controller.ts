import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { ProfileService } from './profile.service';
import { CreateProfileDto } from './dto/create-profile.dto';
import { ApiBody, ApiConsumes, ApiOperation } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('profile')
export class ProfileController {
  constructor(private readonly profileService: ProfileService) {}

  @Post()
  create(@Body() createProfileDto: CreateProfileDto) {
    const userId = '662aacf536c9d08c1ac4dac1';
    return this.profileService.create(createProfileDto, userId);
  }

  @Get()
  myProfile() {
    const userId = '662aacf536c9d08c1ac4dac1';
    return this.profileService.getProfile(userId);
  }

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
  async uploadImgFile(@UploadedFile() file) {
    const fileName = file.originalname;
    const fileContent = file.buffer;
    const userId = '662aacf536c9d08c1ac4dac1';
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
