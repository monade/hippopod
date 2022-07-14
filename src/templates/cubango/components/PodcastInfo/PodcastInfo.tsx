import React, {useState} from 'react';
import {Links} from '../../../../models/links';
import {Podcast} from '../../../../models/podcast';
import {Socials} from '../../../../models/socials';
import PodcastAuthor from '../PodcastAuthor/PodcastAuthor';
import PodcastLinks from '../PodcastLinks/PodcastLinks';
import './PodcastInfo.scss'

interface Props {
  podcast: Podcast;
  links: Links;
  socials: Socials;
  textColorOnPrimary: string;
}

const PodcastInfo: React.FC<Props> = ({podcast, links, socials, textColorOnPrimary}) => {
  const [isDescriptionCollapsed, setIsDescriptionCollapsed] = useState<boolean>(true)

  const podcastDescriptionClasses = `podcast-info__content__description ${isDescriptionCollapsed ? 'collapsed' : ''}`

  const toggleDescription = () => setIsDescriptionCollapsed(!isDescriptionCollapsed);

  const renderBadges = () => podcast.categories.map((category, i) => (
    <span className='podcast-info__badge' key={`category_${i}`}
          style={{borderColor: textColorOnPrimary}}>{category}</span>
  ))

  const renderAuthor = () => podcast.author ?
    <span className='podcast-info__content__author'>Di {podcast.author}</span> :
    ''

  return (
    <section className='podcast-info'>
      <div className='podcast-info__header' style={{color: textColorOnPrimary}}>
        <div>{renderBadges()}</div>
        <h1 title={podcast.title}>{podcast.title}</h1>
      </div>
      <div className='podcast-info__content'>
        <div className='podcast-info__content-inner'>
          {renderAuthor()}
          <PodcastLinks links={links}></PodcastLinks>
          <div className={podcastDescriptionClasses} dangerouslySetInnerHTML={{ __html: podcast.description || '' }}></div>
          <button className='podcast-info__content__description-toggle' onClick={() => toggleDescription()}>
            {isDescriptionCollapsed ? 'Read more' : 'Collapse'}
          </button>
        </div>
      </div>
      <PodcastAuthor podcast={podcast} socials={socials}></PodcastAuthor>
    </section>
  )
}

export default PodcastInfo;
