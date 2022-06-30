import React from 'react';
import { Links } from '../../../../models/links';
import PodcastIcon from '../PodcastIcon/PodcastIcon';
import './PodcastLinks.scss';
import applePodcastsIcon from '../../assets/apple_podcasts.svg';
import googlePodcastsIcon from '../../assets/google_podcasts.svg';
import pocketCastsIcon from '../../assets/pocketcasts.svg';
import spotifyIcon from '../../assets/spotify.svg';
import rssFeedIcon from '../../assets/rss.svg';

interface Props {
  links: Links;
}

const PodcastLinks: React.FC<Props> = ({ links }) => {
  return (
    <div className='podcast-links'>
      <PodcastIcon url={ links?.applePodcasts } iconUrl={applePodcastsIcon} alt='Apple Podcasts' width='40px' height='40px'></PodcastIcon>
      <PodcastIcon url={ links?.googlePodcasts } iconUrl={googlePodcastsIcon} alt='Google Podcasts' width='40px' height='40px'></PodcastIcon>
      <PodcastIcon url={ links?.pocketCasts } iconUrl={pocketCastsIcon} alt='Pocket Casts' width='40px' height='40px'></PodcastIcon>
      <PodcastIcon url={ links?.spotify } iconUrl={spotifyIcon} alt='Spotify' width='40px' height='40px'></PodcastIcon>
      <PodcastIcon url={ links?.rssFeed } iconUrl={rssFeedIcon} alt='RSS Feed' width='40px' height='40px'></PodcastIcon>
    </div>
  );
}

export default PodcastLinks;