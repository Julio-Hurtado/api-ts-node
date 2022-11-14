import { UploadedFile } from 'express-fileupload';
import path from 'path';
import fs from 'fs';
import { uploadFile } from './upload-file';

export const updateImage = async (
  file: UploadedFile,
  image: string | null,
  folder: string,
) => {
  if (image) {
    const pathImg = path.join(__dirname, '../uploads', folder, image);
    if (fs.existsSync(pathImg)) {
      fs.unlinkSync(pathImg);
    }
  }
  const newImage = await uploadFile(file, null, folder);
  return newImage;
};
