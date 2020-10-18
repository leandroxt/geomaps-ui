import React, { ReactElement } from 'react';

interface Props {
  style?: React.CSSProperties;
}

export default function Loading({ style }: Props): ReactElement<Props> {
  return (
    <div className="d-flex flex-column justify-content-center align-items-center justify-content-center" style={style}>
      <div className="spinner-border" role="status">
        <span className="sr-only">Carregando...</span>
      </div>
    </div>
  );
}

Loading.defaultProps = {
  style: {},
};
