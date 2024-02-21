import * as fs from 'fs';
import * as path from 'path';

export function DeleteImageUtil(folederName: string, imageName: string) {
  const filePath = path.resolve(
    __dirname,
    '..',
    'static',
    folederName,
    imageName,
  );
  fs.unlinkSync(filePath);
}
