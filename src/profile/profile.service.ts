import { Injectable } from '@nestjs/common';
import { CreateProfileDto } from './dto/create-profile.dto';
import { CombinedPluginModel } from 'src/database/database.interface';
import { InjectModel } from '@nestjs/mongoose';
import { UserDocument } from 'src/database/schemas/user.schema';
import { ConnectionName } from 'src/database/database.module';
import { ProfileDocument } from 'src/database/schemas/profile.schema';
import { ConfigService } from '@nestjs/config';
import * as Minio from 'minio';
import { Readable } from 'stream';

@Injectable()
export class ProfileService {
  private minioClient: Minio.Client;
  private readonly bucketName: string;
  private readonly serviceUrl: string;
  constructor(
    private configService: ConfigService,
    //dataBase
    @InjectModel(UserDocument.name, ConnectionName.database)
    private readonly userDocModel: CombinedPluginModel<UserDocument>,

    @InjectModel(ProfileDocument.name, ConnectionName.database)
    private readonly profileDocModel: CombinedPluginModel<ProfileDocument>,
  ) {
    const endPoint = this.configService.get('MINIO_ENDPOINT');
    const port = parseInt(this.configService.get('MINIO_PORT'));
    const accessKey = this.configService.get('MINIO_ACCESS_KEY');
    const secretKey = this.configService.get('MINIO_SECRET_KEY');
    const useSSL = false;
    const bucketName = this.configService.get('MINIO_BUCKET_NAME');
    this.serviceUrl = this.configService.get('SERVICE_URL');

    this.bucketName = bucketName;
    this.minioClient = new Minio.Client({
      endPoint: endPoint,
      port: port,
      accessKey: accessKey,
      secretKey: secretKey,
      useSSL: useSSL,
    });
  }

  async create(profileData: CreateProfileDto, userId: string) {
    const profile = await this.profileDocModel.findOne({
      userId: userId,
    });

    const updateProfile = await this.profileDocModel.findByIdAndUpdate(
      profile._id,
      {
        ...profileData,
      },
    );

    return updateProfile;
  }

  async getProfile(userId: string) {
    const profile = await this.profileDocModel.findOne({
      userId: userId,
    });

    return profile;
  }

  async uploadFile(
    userId: string,
    fileName: string,
    fileContent: Readable,
  ): Promise<string> {
    try {
      const fileExtension = fileName.split('.').pop();
      const newFileName = `profile-img-${userId}.${fileExtension}`;
      await this.minioClientPutObject(newFileName, fileContent);

      const imgURL = this.serviceUrl + '/file/' + newFileName;

      const profile = await this.profileDocModel.findOne({
        userId: userId,
      });

      await this.profileDocModel.findByIdAndUpdate(profile._id, {
        profileImageURL: imgURL,
      });

      return imgURL;
    } catch (error) {
      throw error;
    }
  }

  async minioClientPutObject(
    fileName: string,
    fileContent: Readable,
  ): Promise<Minio.UploadedObjectInfo> {
    return new Promise((resolve, reject) => {
      this.minioClient.putObject(
        this.bucketName,
        fileName,
        fileContent,
        (err, etag) => {
          if (err) {
            reject(err);
          } else {
            resolve(etag);
          }
        },
      );
    });
  }
}
