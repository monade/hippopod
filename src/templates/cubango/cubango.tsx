import { useEffect, useState } from "react";
import { Podcast } from "../../models/podcast";
import { getPodcast } from "../../utils/podcastUtils";
import "./cubango.scss";
import Header from "./components/header/header";
import { Player } from "../../components";

const Cubango = () => {
  const [podcast, setPodcast] = useState<Podcast>();

  useEffect(() => {
    getPodcast("https://feeds.megaphone.fm/muschioselvaggio").then((res) =>
      setPodcast(res)
    );
  });

  return (
    <>
      <Header title={podcast?.title} />
      <Player />
    </>
  );
};

export default Cubango;
