#! /usr/bin/env node

import chalk from 'chalk';
import figlet from 'figlet';
import gradient from 'gradient-string';
import cliSpinners from "cli-spinners";
import ora from "ora";
import {isHexadecimal} from 'is-hexadecimal'
import camelcase from "camelcase";
import {dirname} from 'path';
import {fileURLToPath} from 'url';
import shell from 'shelljs';
import Palette from "./classes/Palette.js";
import getImageUrlFromRssFeed from "./utils/rssFeed.js";
import stripAnsi from "strip-ansi";
import Asker from "./classes/Asker.js";
import {validUrl} from "./utils/ulrValidator.js";
import HippopodBuilder from "./classes/HippopodBuilder.js";
import {sleep} from "./utils/sleep.js";

await welcome();

const invokationFolder = process.cwd();
const __dirname = `${dirname(fileURLToPath(import.meta.url))}/..`;
const asker = new Asker();
process.chdir(__dirname)

const rssFeed = await askRssFeed();
const theme = await askTheme();
const themeMode = await askThemeMode();
const color = await chooseColor();
const choosedSocials = await chooseSocials();
const {
  applePodcasts,
  googlePodcasts,
  pocketCasts,
  spotify,
  twitter,
  facebook,
  instagram
} = await askSocialLinks(choosedSocials);

await build();

const folderName = await askFolderName();
saveFolder();

async function welcome()  {
  const message = 'HIPPOPOD   CLI';

  figlet(message, { horizontalLayout: 'fitted' }, (err, data) => {
    console.log(gradient.pastel(data));
  })

  await sleep();
}

async function askRssFeed() {
  return await asker.ask('Inset RSS feed link', async (answer) => {
    await sleep(100);
    if (validUrl(answer)) {
      return true;
    }
    return 'Invalid RSS feed link';
  });
}

async function askTheme() {
  return await asker.askList('Choose a theme', ['Cubango', 'Zambezi', 'Bani']);
}

async function askThemeMode() {
  return await asker.askList('Choose a theme mode', ['Light', 'Dark']);
}

async function chooseColor() {
  const spinner = ora({text: 'Extracting colors from podcast cover', spinner: cliSpinners.arrow3, color: "green"}).start()
  const imageUrl = await getImageUrlFromRssFeed(rssFeed);
  const palette = new Palette();
  const colors = await palette.extract(imageUrl);
  const mappedColors = colors.map(color => chalk.hex(color).inverse(color));
  mappedColors.push('Custom');

  spinner.stop();
  spinner.clear();

  let chosenColor = await asker.askList('Choose color', mappedColors);

  if (chosenColor === 'Custom') {
    chosenColor = await asker.ask('Insert a color (HEX)', async (answer) => {
      await sleep(100);
      let parsed = answer;

      if (answer.includes('#')) {
        parsed = parsed.substring(1);
      }

      if (isHexadecimal(parsed)) {
        return true;
      }
      return 'Must be a valid HEX color';
    });
  } else {
    chosenColor = stripAnsi(chosenColor);
  }

  if (chosenColor.includes('#')) {
    chosenColor = chosenColor.substring(1);
  }

  return chosenColor;
}

async function chooseSocials() {
  return await asker.askCheckbox('Choose socials', ['Apple Podcasts', 'Google Podcasts', 'Pocket Casts', 'Spotify', 'Twitter', 'Facebook', 'Instagram']);
}

async function askSocialLinks(choosedSocials) {
  const linksType = [
    {name: 'Apple Podcasts', domain: 'apple', errorMessage: 'Invalid apple podcasts link'},
    {name: 'Google Podcasts', domain: 'google', errorMessage: 'Invalid google podcasts link'},
    {name: 'Pocket Casts', domain: 'pca', errorMessage: 'Invalid pocket casts link'},
    {name: 'Spotify', domain: 'spotify', errorMessage: 'Invalid spotify link'},
    {name: 'Twitter', domain: 'twitter', errorMessage: 'Invalid twitter link'},
    {name: 'Facebook', domain: 'facebook', errorMessage: 'Invalid facebook link'},
    {name: 'Instagram', domain: 'instagram', errorMessage: 'Invalid instagram link'},
  ];

  const choosedLinksType = linksType.filter(e => {
    return choosedSocials.includes(e.name)
  })

  const links = {}

  for(const linkType of choosedLinksType) {
    links[camelcase(linkType.name)] = await asker.ask(`Insert ${linkType.name} link`, async (answer) => {
      if (!answer || validUrl(answer, linkType.domain)) {
        return true;
      }
      return linkType.errorMessage;
    });
  }

  return links;
}

async function build() {
  const hippopodBuilder = new HippopodBuilder();
  await hippopodBuilder.build({
    themeMode: themeMode.toLowerCase(),
    color,
    rssFeed,
    applePodcasts,
    googlePodcasts,
    pocketCasts,
    spotify,
    twitter,
    facebook,
    instagram
  }, theme);
}

async function askFolderName() {
  return await asker.ask('Choose folder name');
}

function saveFolder() {
  const name = folderName ? folderName : 'hippopod';
  shell.cp('-R', './build', `${invokationFolder}/${name}`)
  shell.rm('-rf', './build');
}
