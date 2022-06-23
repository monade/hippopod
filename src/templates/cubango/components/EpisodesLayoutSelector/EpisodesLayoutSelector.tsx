import React from 'react';
import './EpisodesLayoutSelector.scss';
import { EpisodesLayout } from '../../../../models/episodes-layout';
import listIcon from '../../icons/list.svg';
import gridIcon from '../../icons/grid.svg';
import EpisodesLayoutSelectorButton from '../EpisodesLayoutSelectorButton/EpisodesLayoutSelectorButton';

interface Props {
  layout: EpisodesLayout;
  onLayoutSelect: (layout: EpisodesLayout) => void;
}

const EpisodesLayoutSelector: React.FC<Props> = ({ layout, onLayoutSelect }) => {
  return (
    <div className='episodes-layout-selector'>
      <EpisodesLayoutSelectorButton label='List' iconSrc={listIcon} layout='list' isSelected={layout === 'list'} onSelect={() => onLayoutSelect('list')}></EpisodesLayoutSelectorButton>
      <EpisodesLayoutSelectorButton label='Grid' iconSrc={gridIcon} layout='grid' isSelected={layout === 'grid'} onSelect={() => onLayoutSelect('grid')}></EpisodesLayoutSelectorButton>
    </div>
  )
}

export default EpisodesLayoutSelector;