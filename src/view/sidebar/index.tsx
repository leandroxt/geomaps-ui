import React, { ReactElement } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Layer, panToAndZoom } from 'modules/map';
import { DispatchType, State, ACTIONS } from 'store';
import Features from 'view/features';

export default function Sidebar(): ReactElement {
  const layers = useSelector<State, Layer[]>((s) => s.layers);
  const dispatch = useDispatch<DispatchType>();

  function centralizeLayer(l: Layer) {
    return () => {
      panToAndZoom(l.centroid);
    };
  }

  function removePolygon(l: Layer) {
    return () => {
      l.polygon.setMap(null);
      dispatch({
        type: ACTIONS.REMOVE_LAYER,
        payload: l.id,
      });
    };
  }

  return (
    <>
      <div className="sidebar-sticky pt-3">
        <Features />
        <h6 className="sidebar-heading d-flex justify-content-between align-items-center px-3 mt-4 mb-1 text-muted">
          <span>Layers</span>
          <div className="d-flex align-items-center text-muted" aria-label="Add a new report">
            <span className="material-icons">layers</span>
          </div>
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
                <button
                  className="nav-link btn btn-sm"
                  type="button"
                  onClick={removePolygon(layer)}
                >
                  <span className="material-icons">
                    delete
                  </span>
                </button>
                <button
                  type="button"
                  className="btn btn-link"
                  onClick={centralizeLayer(layer)}
                >
                  {layer.name}
                </button>
              </span>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
