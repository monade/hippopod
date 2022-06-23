import React from 'react';
import { EpisodesLayout } from '../../../../models/episodes-layout';
import './EpisodesLayoutSelectorButton.scss';

interface Props {
  label: string;
  iconSrc: string;
  layout: EpisodesLayout;
  isSelected: boolean;
  onSelect: () => void
}

const EpisodesLayoutSelectorButton: React.FC<Props> = ({ label, iconSrc, layout, isSelected, onSelect }) => {
  return (
    <button className='episodes-layout-selector-button' onClick={ () => onSelect() }>
      <img src={iconSrc} alt={label} />
      {label}
    </button>
  )
}

export default EpisodesLayoutSelectorButton;