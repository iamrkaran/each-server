import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return (
      'This is Each APi  ' +
      'Go to <a href="/api">/api</a> to view the Swagger documentation.'
    );
  }
}
