import { randomBytes } from 'crypto';

export const generateUniqueFileName =(originalFileName: string) =>{
  const timestamp = new Date().getTime();
  const randomString = randomBytes(4).toString('hex'); 

  const fileName = `${timestamp}-${randomString}-${originalFileName}`;

  return fileName;
}
