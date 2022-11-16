import { existsSync } from 'fs';
import path from 'path';

interface IPath {
  path: string | null;
}

/**
 *
 * @param image string name of image
 * @param folder name folder location
 * @returns string path or null
 */
export const getLocalPathImage = (image: string | null, folder: string) => {
  return new Promise<IPath>((resolve) => {
    if (image) {
      const localPath = path.join(__dirname, '../uploads', folder, image);
      if (existsSync(localPath)) {
        resolve({ path: localPath });
      }
    }
    resolve({ path: null });
  });
};
