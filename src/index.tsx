import React from "react";
import ReactDOM from "react-dom/client";
import config from "./data/arguments.json";
import "./index.scss";
import { PlayerProvider } from "./store/playerContext";
import Bani from "./templates/bani/bani";
import Cubango from "./templates/cubango/cubango";
import Zambezi from "./templates/zambezi/zambezi";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

switch((config as any).theme) {
    case 'bani':
        root.render(
            <Bani />
        );
        break;
    case 'cubango':
        root.render(
          <PlayerProvider>
            <Cubango color={(config as any).color} themeMode={(config as any).themeMode} links={(config as any).links || {}} socials={(config as any).socials || {}} />
          </PlayerProvider>
        );
        break;
    case 'zambezi':
        root.render(
            <Zambezi />
        )
        break;
}

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
