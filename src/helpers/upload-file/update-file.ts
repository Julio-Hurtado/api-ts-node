import { UploadedFile } from 'express-fileupload';
import fs from 'fs';
import { uploadFile } from './upload-file';
import { getLocalPathImage } from '../find-path-image';

export const updateImage = async (
  file: UploadedFile,
  image: string | null,
  folder: string,
) => {
  const { path } = await getLocalPathImage(image, folder);
  if (path) {
    fs.unlinkSync(path);
  }
  const newImage = await uploadFile(file, null, folder);
  return newImage;
};
