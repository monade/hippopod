import React from 'react';
import { Socials } from '../../../../models/socials';
import PodcastIcon from '../PodcastIcon/PodcastIcon';
import './PodcastSocials.scss';
import facebookIcon from '../../icons/fb.svg';
import instagramIcon from '../../icons/instagram.svg';
import twitterIcon from '../../icons/twitter.svg';

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