// import {
//   Controller,
//   Post,
//   UploadedFile,
//   UseInterceptors,
// } from '@nestjs/common';
// import { FileInterceptor } from '@nestjs/platform-express';
// import { ApiBody, ApiConsumes, ApiOperation } from '@nestjs/swagger';

// import { AwsS3Service } from 'src/aws-s3/aws-s3.service';

// @Controller()
// export class AwsS3Controller {
//   constructor(private readonly awsS3Service: AwsS3Service) {}

//   @Post('upload')
//   @ApiOperation({ summary: 'Upload a file' })
//   @ApiConsumes('multipart/form-data')
//   @ApiBody({
//     schema: {
//       type: 'object',
//       properties: {
//         file: {
//           type: 'string',
//           format: 'binary',
//         },
//       },
//     },
//   })
//   @UseInterceptors(FileInterceptor('file'))
//   uploadFile(@UploadedFile() file: Express.Multer.File) {
//     return this.awsS3Service.uploadImage(
//       file,
//       file.originalname,
//       file.mimetype,
//     );
//   }
// }
