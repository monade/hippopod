import React from 'react';
import {Podcast} from '../../../../models/podcast';
import {Socials} from '../../../../models/socials';
import PodcastAuthorField from '../PodcastAuthorField/PodcastAuthorField';
import PodcastSocials from '../PodcastSocials/PodcastSocials';
import './PodcastAuthor.scss';

interface Props {
  podcast: Podcast;
  socials: Socials;
  themeMode: string;
}

const PodcastAuthor: React.FC<Props> = ({podcast, socials, themeMode}) => {

  const renderImage = () => podcast.imageUrl ? <img src={podcast.imageUrl} alt={podcast.title}/> : null;
  const renderSocials = () => Object.getOwnPropertyNames(socials)?.length ?
    <PodcastAuthorField label='Social'>
      <PodcastSocials socials={socials} themeMode={themeMode}/>
    </PodcastAuthorField> :
    '';

  return (
    <div className='podcast-author'>
      {renderImage()}
      <div className='podcast-author__fields'>
        <PodcastAuthorField label='Author'>Di {podcast.author}</PodcastAuthorField>
        <PodcastAuthorField label='Contacts'>
          <a className='podcast-author__fields__contacts' href={`mailto:${podcast.email}`}>{podcast.email}</a>
        </PodcastAuthorField>
        {renderSocials()}
      </div>
    </div>
  );
}

export default PodcastAuthor;
