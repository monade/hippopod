#! /usr/bin/env node

import chalk from 'chalk';
import figlet from 'figlet';
import gradient from 'gradient-string';
import inquirer from 'inquirer';
import cliSpinners from "cli-spinners";
import ora from "ora";
import {isHexadecimal} from 'is-hexadecimal'
import camelcase from "camelcase";
import {execSync} from "child_process";
import Builder from "./classes/Builder.js";
import {dirname} from 'path';
import {fileURLToPath} from 'url';
import shell from 'shelljs';
import Palette from "./classes/Palette.js";
import getImageUrlFromRssFeed from "./utils/rssFeed.js";
import stripAnsi from "strip-ansi";

const invokationFolder = process.cwd();
const __dirname = `${dirname(fileURLToPath(import.meta.url))}/..`;
process.chdir(__dirname)

await welcome();

const rssFeed = await ask('Inset RSS feed link', async (answer) => {
  await sleep(100);
  if (validUrl(answer)) {
    return true;
  }
  return 'Invalid RSS feed link';
});

const theme = await askList('Choose a theme', ['Cubango', 'Zambezi', 'Bani']);
const themeMode = await askList('Choose a theme mode', ['Light', 'Dark']);
const color = await chooseColor();
const choosedSocials = await askCheckbox('Choose socials', ['Apple Podcasts', 'Google Podcasts', 'Pocket Casts', 'Spotify', 'Twitter', 'Facebook', 'Instagram']);
const {
  applePodcasts,
  googlePodcasts,
  pocketCasts,
  spotify,
  twitter,
  facebook,
  instagram
} = await askLinks(choosedSocials);

build();

await replaceParams();

const folderName = await ask('Choose folder name');

saveFolder();

async function welcome()  {
  const message = 'WELCOME   TO   HIPPOPOD   CLI';

  figlet(message, { horizontalLayout: 'fitted' }, (err, data) => {
    console.log(gradient.pastel(data));
  })

  await sleep();
}

async function askLinks(choosedSocials) {
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
    const response = await ask(`Insert ${linkType.name} link`, async (answer) => {
      if (!answer || validUrl(answer, linkType.domain)) {
        return true;
      }
      return linkType.errorMessage;
    });
    links[camelcase(linkType.name)] = response;
  }

  return links;
}

async function askList(message, choices) {
  const answer = await inquirer.prompt({
    name: 'response',
    type: 'list',
    message,
    choices,
  });
  return answer.response;
}

async function ask(message, validation) {
  const answer = await inquirer.prompt({
    name: 'response',
    type: 'input',
    message,
    validate: validation,
  });
  return answer.response;
}

async function askCheckbox(message, choices) {
  const answer = await inquirer.prompt({
    name: 'response',
    type: 'checkbox',
    message,
    choices,
  });
  return answer.response;
}

function validUrl(url, domain) {
  let urlObj;
  try {
    urlObj = new URL(url);
  } catch (_) {
    return false;
  }
  if (domain && !url.includes(domain)) {
    return false;
  }
  return urlObj.protocol === 'http:' || urlObj.protocol === 'https:'
}

function sleep(ms = 500) { return new Promise(resolve => setTimeout(resolve, ms)) }

function build() {
  try {
    console.log(chalk.green('Building...'));
    shell.cp('./src/data/arguments.ts', './src/data/_arguments.ts');
    shell.cp('./src/data/arguments.production.ts', './src/data/arguments.ts');
    // shell.sed(['-i','-e'], 'ARGUMENTS.theme', `'${theme.toLowerCase()}'`, './src/index.tsx')
    execSync(`sed -i -e "s/ARGUMENTS.theme/'${theme.toLowerCase()}'/g" ./src/index.tsx`);
    shell.rm('-rf', './build');
    shell.exec('npm install -q');
    shell.exec('npm run build -q');
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

async function replaceParams() {
  const builder = new Builder();
  const params = {
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
  };
  await builder.generate('build/static/js/*.js*', 'RSS_FEED_LINK', params);
}

function saveFolder() {
  const name = folderName ? folderName : 'hippopod';
  shell.cp('-R', './build', `${invokationFolder}/${name}`)
  shell.rm('-rf', './build');
}

async function chooseColor() {
  const spinner = ora({text: 'Extracting colors from podcast cover', spinner: cliSpinners.arrow3, color: "magenta"}).start()

  const imageUrl = await getImageUrlFromRssFeed(rssFeed);
  const palette = new Palette();
  const colors = await palette.extract(imageUrl);
  const mappedColors = colors.map(color => chalk.hex(color).inverse(color));
  mappedColors.push('Custom');

  spinner.stop();
  spinner.clear();

  let chosenColor = await askList('Choose color', mappedColors);

  if (chosenColor === 'Custom') {
    chosenColor = await ask('Insert a color (HEX)', async (answer) => {
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
