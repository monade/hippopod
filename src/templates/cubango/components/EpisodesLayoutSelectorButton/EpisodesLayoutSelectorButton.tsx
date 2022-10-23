import React, { PropsWithChildren, useMemo } from "react";
import { EpisodesLayout } from "../../../../models/episodes-layout";
import "./EpisodesLayoutSelectorButton.scss";
import ARGUMENTS from "../../../../data/arguments";

interface Props {
  label: string;
  layout: EpisodesLayout;
  isSelected: boolean;
  onSelect: () => void;
}

const EpisodesLayoutSelectorButton: React.FC<PropsWithChildren<Props>> = ({
  label,
  layout,
  isSelected,
  onSelect,
  children,
}) => {
  const labelClasses = isSelected ? "active" : "";

  const background = useMemo(() => {
    return `episodes-layout-selector-button--${ARGUMENTS.themeMode}`;
  }, []);

  return (
    <button
      className={`episodes-layout-selector-button ${background}`}
      onClick={() => onSelect()}
    >
      {children}
      <span className={labelClasses}>{label}</span>
    </button>
  );
};

export default EpisodesLayoutSelectorButton;
