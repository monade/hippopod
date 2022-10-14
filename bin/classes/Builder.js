import glob from 'glob';
import { escape } from 'html-escaper'
import { readFile, writeFile } from 'node:fs/promises';

export default class Builder {
  generate(filesToEdit, stringToSearch, params) {
    return new Promise((resolve, reject) => {
      glob(filesToEdit, {}, async (err, files) => {
        for (let i = 0; i < files.length; i++)  {
          let data
          let file = "";

          try {
            data = await readFile(files[i], 'utf8');
          } catch(err) {
            reject(err.message)
          }

          if (data && data.includes(stringToSearch)) {
            file = Builder.replaceParams(data, params);

            try {
              await writeFile(files[i], file);
              resolve();
            } catch(err) {
              reject(err.message);
            }
          }
        }
      });
    });
  }

  static replaceParams(data, params) {
    const {
      color,
      themeMode,
      applePodcasts,
      googlePodcasts,
      pocketCasts,
      spotify,
      rssFeed,
      facebook,
      instagram,
      twitter
    } = params;
    let file = data;

    file = file.replace('PRIMARY_COLOR_NAME', escape(color));
    file = file.replace('THEME_MODE', escape(themeMode));
    file = file.replace('APPLE_PODCASTS_LINK', escape(applePodcasts ? applePodcasts : ''));
    file = file.replace('GOOGLE_PODCASTS_LINK', escape(googlePodcasts ? googlePodcasts : ''));
    file = file.replace('POCKET_CASTS_LINK', escape(pocketCasts ? pocketCasts : ''));
    file = file.replace('SPOTIFY_LINK', escape(spotify ? spotify : ''));
    file = file.replace('RSS_FEED_LINK', escape(rssFeed));
    file = file.replace('FACEBOOK_LINK', escape(facebook ? facebook : ''));
    file = file.replace('INSTAGRAM_LINK', escape(instagram ? facebook : ''));
    file = file.replace('TWITTER_LINK', escape(twitter ? twitter : ''));

    return file;
  }
}
