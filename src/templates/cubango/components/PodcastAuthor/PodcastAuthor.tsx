import React from 'react';
import { Podcast } from '../../../../models/podcast';
import { Socials } from '../../../../models/socials';
import PodcastAuthorField from '../PodcastAuthorField/PodcastAuthorField';
import PodcastSocials from '../PodcastSocials/PodcastSocials';
import './PodcastAuthor.scss';

interface Props {
  podcast: Podcast;
  socials: Socials;
}

const PodcastAuthor: React.FC<Props> = ({ podcast, socials }) => {

  const renderImage = () => podcast.imageUrl ? <img src={podcast.imageUrl} alt={podcast.title} /> : null;

  return (
    <div className='podcast-author'>
      { renderImage() }
      <div className='podcast-author__fields'>
        <PodcastAuthorField label='Author'>Di {podcast.author}</PodcastAuthorField>
        <PodcastAuthorField label='Contacts'>{podcast.email}</PodcastAuthorField>
        <PodcastAuthorField label='Social'>
          <PodcastSocials socials={socials} />
        </PodcastAuthorField>
      </div>
    </div>
  );
}

export default PodcastAuthor;