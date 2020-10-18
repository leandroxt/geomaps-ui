import React, { ReactElement } from 'react';
import { Layer } from '../../app';

interface Props {
  layers: Layer[];
  onRemoveLayer: (layer: Layer) => void;
}

export default function Sidebar({
  layers,
  onRemoveLayer,
}: Props): ReactElement<Props> {
  return (
    <div className="sidebar-sticky pt-3">
      <h6 className="sidebar-heading px-3 mt-4 mb-1 text-muted">
        <span>Layers</span>
        <a className="d-flex align-items-center text-muted" href="/#" aria-label="Add a new report">
          <span data-feather="plus-circle" />
        </a>
      </h6>
      <ul className="nav flex-column mb-2">
        {layers.length === 0 && (
          <div className="d-flex align-items-center justify-content-center mt-4">
            Nenhum dado!
            <span className="material-icons ml-2">
              thumb_down
            </span>
          </div>
        )}
        {layers.map((layer) => (
          <li key={layer.id} className="nav-item">
            <span className="d-flex align-items-center ">
              <button className="nav-link btn btn-sm" type="button" onClick={() => onRemoveLayer(layer)}>
                <span className="material-icons">
                  delete
                </span>
              </button>
              {layer.name}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
