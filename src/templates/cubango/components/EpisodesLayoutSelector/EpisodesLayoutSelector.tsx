import React from 'react';
import './EpisodesLayoutSelector.scss';
import { EpisodesLayout } from '../../../../models/episodes-layout';
import { ReactComponent as ListIcon } from '../../assets/list.svg';
import { ReactComponent as GridIcon } from '../../assets/grid.svg';
import EpisodesLayoutSelectorButton from '../EpisodesLayoutSelectorButton/EpisodesLayoutSelectorButton';

interface Props {
  layout: EpisodesLayout;
  onLayoutSelect: (layout: EpisodesLayout) => void;
}

const EpisodesLayoutSelector: React.FC<Props> = ({ layout, onLayoutSelect }) => {
  const iconClasses = (isSelected: boolean) => `episodes-layout-selector__icon${ isSelected ? ' active' : '' }`;

  return (
    <div className='episodes-layout-selector'>
      <EpisodesLayoutSelectorButton label='List' layout='list' isSelected={layout === 'list'} onSelect={() => onLayoutSelect('list')}>
        <ListIcon className={ iconClasses(layout === 'list') }></ListIcon>
      </EpisodesLayoutSelectorButton>
      <EpisodesLayoutSelectorButton label='Grid' layout='grid' isSelected={layout === 'grid'} onSelect={() => onLayoutSelect('grid')}>
        <GridIcon className={ iconClasses(layout === 'grid') }></GridIcon>
      </EpisodesLayoutSelectorButton>
    </div>
  )
}

export default EpisodesLayoutSelector;