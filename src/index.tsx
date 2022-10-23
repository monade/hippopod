import React from "react";
import ReactDOM from "react-dom/client";
import "./index.scss";
import { PlayerProvider } from "./store/playerContext";
import ARGUMENTS from "./data/arguments";
const Theme = React.lazy(
  () => import(`./templates/${ARGUMENTS.theme}/${ARGUMENTS.theme}`)
);

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

const localConfig = localStorage.getItem("config") as any;
const config = localConfig ? JSON.parse(localConfig) : ARGUMENTS;

root.render(
  <PlayerProvider>
    <Theme
      color={(config as any).color}
      themeMode={(config as any).themeMode}
      links={(config as any).links || {}}
      socials={(config as any).socials || {}}
    />
  </PlayerProvider>
);
