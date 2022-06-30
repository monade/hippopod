import React, {PropsWithChildren} from 'react';
import { EpisodesLayout } from '../../../../models/episodes-layout';
import './EpisodesLayoutSelectorButton.scss';

interface Props {
  label: string;
  layout: EpisodesLayout;
  isSelected: boolean;
  onSelect: () => void
}

const EpisodesLayoutSelectorButton: React.FC<PropsWithChildren<Props>> = ({ label, layout, isSelected, onSelect, children }) => {
  const labelClasses = isSelected ? 'active' : '';

  return (
    <button className='episodes-layout-selector-button' onClick={ () => onSelect() }>
      <div className='episodes-layout-selector-button__backdrop'></div>
      {children}
      <span className={labelClasses}>{label}</span>
    </button>
  )
}

export default EpisodesLayoutSelectorButton;