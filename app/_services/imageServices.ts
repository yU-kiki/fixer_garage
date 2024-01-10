'use server';

import fs from 'fs';
import path from 'path';

export const fetchImageCount = (
  brandName: string,
  productId: string,
): number => {
  const directoryPath = path.join(
    process.cwd(),
    `public/images/products/${brandName}/${productId}/`,
  );
  try {
    const files = fs.readdirSync(directoryPath);
    return files.length;
  } catch (error) {
    console.error('Error reading directory:', error);
    return 0;
  }
};
