import { Injectable } from '@nestjs/common';
import * as AWS from 'aws-sdk';

@Injectable()
export class AwsS3Service {
  private s3: AWS.S3;

  constructor() {
    this.s3 = new AWS.S3({
      accessKeyId: process.env.EACH_AWS_ACCESS_KEY,
      secretAccessKey: process.env.EACH_AWS_SECRET_KEY,
      region: process.env.EACH_AWS_REGION,
      
    });
  }


  async uploadImage(file:Express.Multer.File, filename: string, mimetype: string,hashedUser:string): Promise<string> {
    const folderPath = `${hashedUser}/`;
    const params = {
      Bucket: process.env.EACH_AWS_BUCKET_NAME,
      Key: folderPath + filename,
      Body: file.buffer,
      ACL: 'public-read',
      ContentType: mimetype,
      ContentDisposition: 'inline',
      CreateBucketConfiguration: {
        LocationConstraint: process.env.EACH_AWS_REGION,
      },
    };

    const data = await this.s3.upload(params).promise();

    return data.Location;
  }
}
