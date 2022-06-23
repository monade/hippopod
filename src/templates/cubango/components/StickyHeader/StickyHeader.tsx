import React from 'react';
import './StickyHeader.scss'

interface Props {
    title?: string;
    imageUrl?: string;
    lastBuildDate?: Date;
    textColor: string;
}

const StickyHeader: React.FC<Props> = ({ lastBuildDate, ...props }) => {
    const lastUpdate = lastBuildDate ? `Last Update ${lastBuildDate.getDate()}/${lastBuildDate.getMonth() + 1}/${lastBuildDate.getFullYear()}` : '';

    const renderImage = () => props.imageUrl ? <img className="sticky-header__image" src={props.imageUrl} alt={props.title} style={{ borderColor: props.textColor }} /> : null;

    return (
        <header className={'sticky-header'} style={{ color: props.textColor }}>
            <div className="sticky-header__inner">
                { renderImage() }
                <span className="sticky-header__title">{ props.title }</span>
                <span className="sticky-header__last-update">{ lastUpdate }</span>
            </div>
            <div className='sticky-header__backdrop'></div>
        </header>
    )
}

export default StickyHeader;