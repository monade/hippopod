import {useEffect, useState} from "react";
import {Podcast} from "../../models/podcast";
import {getPodcast} from "../../utils/podcastUtils";
import './cubango.scss'
import Header from "./components/header/header";

const Cubango = () => {
    const [podcast, setPodcast] = useState<Podcast>()

    useEffect(() => {
        getPodcast('https://feeds.megaphone.fm/muschioselvaggio')
            .then(res => setPodcast(res));
    })

    return (
        <Header title={podcast?.title} />
    )
}

export default Cubango;