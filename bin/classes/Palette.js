import glob from 'glob';
import shell from 'shelljs';
import download from 'download';
import getColors from 'get-image-colors'

export default class Palette {
  async extract(imageUrl) {
    const folder = 'color';

    try {
      await download(imageUrl, folder);
      const palette = await new Promise((resolve, reject) => {
        glob(`${folder}/*`, {}, async (err, files) => {
          if (err) {
            reject(err);
          }
          const image = files[0];
          const colors = await getColors(image)
          resolve(
            colors.map(color => color.hex())
          );
        });
      });
      shell.rm('-rf', `${folder}`)
      return palette;
    } catch (e) {
      throw new Error(e);
    }
  }
}
