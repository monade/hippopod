import React from 'react';
import { Socials } from '../../../../models/socials';
import PodcastIcon from '../PodcastIcon/PodcastIcon';
import './PodcastSocials.scss';
import facebookIcon from '../../assets/fb.svg';
import instagramIcon from '../../assets/instagram.svg';
import twitterIcon from '../../assets/twitter.svg';

interface Props {
  socials: Socials;
}

const PodcastSocials: React.FC<Props> = ({ socials }) => {
  return (
    <div className='podcast-socials'>
      <PodcastIcon url={socials.facebook} iconUrl={facebookIcon} alt='Facebook' width='24px' height='24px'></PodcastIcon>
      <PodcastIcon url={socials.instagram} iconUrl={instagramIcon} alt='Instagram' width='24px' height='24px'></PodcastIcon>
      <PodcastIcon url={socials.twitter} iconUrl={twitterIcon} alt='Twitter' width='24px' height='24px'></PodcastIcon>
    </div>
  );
}

export default PodcastSocials;
