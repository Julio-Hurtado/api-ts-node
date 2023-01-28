import path from 'path';
import * as crypto from 'crypto';
import { UploadedFile } from 'express-fileupload';

const defaultExt = ['png', 'jpg', 'jpeg'];

export const uploadFile = (
  file: UploadedFile,
  extensions: Array<string> | null,
  folder = '',
): Promise<string> => {
  return new Promise<string>((resolve, reject) => {
    const extensionsValid = extensions ?? defaultExt;
    const nameShort = file.name.split('.');
    const extension = nameShort[nameShort.length - 1];

    if (!extensionsValid.includes(extension)) {
      reject(
        new Error(
          `extension file ${extension} invalid, valids -> ${extensionsValid}`,
        ),
      );
    } else {
      const nameTemp = `${crypto.randomUUID()}.${extension}`;
      const uploadPath = path.join(
        __dirname,
        '../../uploads/',
        folder,
        nameTemp,
      );

      file.mv(uploadPath, (err) => {
        if (err) {
          reject(new Error(err));
        }
        resolve(nameTemp);
      });
    }
  });
};
