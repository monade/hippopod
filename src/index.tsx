import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import { getPodcast } from './utils/podcastUtils';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    Hippopod
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

const feeds = [
  'https://podcast.radiopopolare.it/podcast/popolare-gr.xml',
  'https://rss.art19.com/american-history-tellers',
  'https://feeds.megaphone.fm/muschioselvaggio',
  'https://www.omnycontent.com/d/playlist/60311b15-274a-4e3f-8ba9-ac3000834f37/0c2cf638-f8c9-4d9e-8cc3-ae7f01104abc/c1aea8ba-bda1-487d-ac8d-ae7f01104ad8/podcast.rss',
  'https://feeds.megaphone.fm/storiedibrand'
]
for (const feed of feeds) {
  getPodcast(feed).then(podcast => console.log(podcast));
}
