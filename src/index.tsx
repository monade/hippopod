import React from "react";
import ReactDOM from "react-dom/client";
import { ARGUMENTS } from './data/arguments';
import "./index.scss";
import { PlayerProvider } from "./store/playerContext";
import Bani from "./templates/bani/bani";
import Cubango from "./templates/cubango/cubango";
import Zambezi from "./templates/zambezi/zambezi";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

const localConfig = localStorage.getItem('config') as any;
const config = localConfig ? JSON.parse(localConfig) : ARGUMENTS;

switch(config.theme) {
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
