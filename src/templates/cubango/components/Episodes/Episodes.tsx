import React from 'react';
import { EpisodesLayout } from '../../../../models/episodes-layout';
import EpisodesLayoutSelector from '../EpisodesLayoutSelector/EpisodesLayoutSelector';
import './Episodes.scss';

interface Props {
  layout: EpisodesLayout;
  onLayoutSelect: (layout: EpisodesLayout) => void;
}

const Episodes: React.FC<Props> = ({ layout, onLayoutSelect }) => {
  return (
    <div className='episodes'>
      <EpisodesLayoutSelector layout={layout} onLayoutSelect={onLayoutSelect}></EpisodesLayoutSelector>
      <span>bla</span><br />
      <span>bla</span><br />
      <span>bla</span><br />
      <span>bla</span><br />
      <span>bla</span><br />
      <span>bla</span><br />
      <span>bla</span><br />
      <span>bla</span><br />
      <span>bla</span><br />
      <span>bla</span><br />
      <span>bla</span><br />
      <span>bla</span><br />
      <span>bla</span><br />
      <span>bla</span><br />
      <span>bla</span><br />
      <span>bla</span><br />
      <span>bla</span><br />
      <span>bla</span><br />
      <span>bla</span><br />
      <span>bla</span><br />
      <span>bla</span><br />
      <span>bla</span><br />
      <span>bla</span><br />
      <span>bla</span><br />
      <span>bla</span><br />
      <span>bla</span><br />
      <span>bla</span><br />
      <span>bla</span><br />
      <span>bla</span><br />
      <span>bla</span><br />
      <span>bla</span><br />
      <span>bla</span><br />
      <span>bla</span><br />
      <span>bla</span><br />
      <span>bla</span><br />
      <span>bla</span><br />
      <span>bla</span><br />
      <span>bla</span><br />
    </div>
  );
}

export default Episodes;