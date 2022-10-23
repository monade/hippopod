import React, { PropsWithChildren } from "react";
import "./PodcastAuthorField.scss";

interface Props {
  label: string;
}

const PodcastAuthorField: React.FC<PropsWithChildren<Props>> = ({
  label,
  children,
}) => {
  return children ? (
    <div className="podcast-author-field">
      <span className="podcast-author-field__label">{label}</span>
      <span className="podcast-author-field__value">{children}</span>
    </div>
  ) : (
    <></>
  );
};

export default PodcastAuthorField;
