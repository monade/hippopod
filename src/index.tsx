import React from 'react';
import ReactDOM from 'react-dom/client';
import reportWebVitals from './reportWebVitals';
import './index.scss';
import config from './data/arguments.json'

import Bani from './templates/bani/bani'
import Cubango from './templates/cubango/cubango';
import Zambezi from './templates/zambezi/zambezi'

const rootStyle = (document.querySelector(':root') as any).style;
rootStyle.setProperty('--primary', `${config.color}`);

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

switch(config.theme) {
    case 'bani':
        root.render(
            <Bani />
        );
        break;
    case 'cubango':
        root.render(
            <Cubango />
        );
        break;
    case 'zambezi':
        root.render(
            <Zambezi />
        )
        break;
}

reportWebVitals();

// const feeds = [
//   'https://podcast.radiopopolare.it/podcast/popolare-gr.xml',
//   'https://rss.art19.com/american-history-tellers',
//   'https://feeds.megaphone.fm/muschioselvaggio',
//   'https://www.omnycontent.com/d/playlist/60311b15-274a-4e3f-8ba9-ac3000834f37/0c2cf638-f8c9-4d9e-8cc3-ae7f01104abc/c1aea8ba-bda1-487d-ac8d-ae7f01104ad8/podcast.rss',
//   'https://feeds.megaphone.fm/storiedibrand'
// ]
// for (const feed of feeds) {
//   getPodcast(feed).then(podcast => console.log(podcast));
// }
