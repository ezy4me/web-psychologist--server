import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import * as path from 'path';
import { v4 as uuidv4 } from 'uuid';

export const ImageUpload = createParamDecorator(
  (folderName: string, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    const imageFile = request.file;

    if (!imageFile) {
      return null;
    }

    const imageName = uuidv4() + '.png';

    const imagePath = path.resolve(
      __dirname,
      '..',
      'static',
      folderName,
      imageName,
    );

    // fs.writeFileSync(imagePath, imageFile.buffer);

    return { imageName, imagePath, imageFile };
  },
);
