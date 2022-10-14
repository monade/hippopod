import glob from 'glob';
import { escape } from 'html-escaper'
import { readFile, writeFile } from 'node:fs/promises';
import chalk from "chalk";
import shell from "shelljs";
import {execSync} from "child_process";

export default class HippopodBuilder {
  async build(params, theme) {
    this.buildReactApp(theme);
    await this.findAndReplaceParams('build/static/js/*.js*', 'RSS_FEED_LINK', params);
  }

  buildReactApp(theme) {
    try {
      console.log(chalk.green('Building...'));
      shell.cp('./src/data/arguments.ts', './src/data/_arguments.ts');
      shell.cp('./src/data/arguments.production.ts', './src/data/arguments.ts');
      // shell.sed(['-i','-e'], 'ARGUMENTS.theme', `'${theme.toLowerCase()}'`, './src/index.tsx')
      execSync(`sed -i -e "s/ARGUMENTS.theme/'${theme.toLowerCase()}'/g" ./src/index.tsx`);
      shell.rm('-rf', './build');
      shell.exec('npm install --loglevel=error > /dev/null');
      shell.exec('npm run build > /dev/null');
      // shell.sed(['-i', '-e'], `'${theme.toLowerCase()}'`, 'ARGUMENTS.theme', './src/index.tsx')
      execSync(`sed -i -e "s/'${theme.toLowerCase()}'/ARGUMENTS.theme/g" ./src/index.tsx`);
      shell.cp('./src/data/arguments.ts', './src/data/arguments.production.ts');
      shell.cp('./src/data/_arguments.ts', './src/data/arguments.ts');
      shell.rm('-rf', './src/data/_arguments.ts');
      shell.rm('-rf', './package-lock.json');
      shell.rm('-rf', './src/index.tsx-e');
    } catch(e) {
      process.exit(1);
    }
  }

  findAndReplaceParams(filesToEdit, stringToSearch, params) {
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
            file = this.replaceParams(data, params);

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

  replaceParams(data, params) {
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
