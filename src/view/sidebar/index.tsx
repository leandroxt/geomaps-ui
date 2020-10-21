import React, { ReactElement, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Layer } from 'modules/map';
import { DispatchType, State, ACTIONS } from 'store';
import Modal from 'view/shared/modal';
import Geocoder from 'view/geocoder';

export default function Sidebar(): ReactElement {
  const [isOpen, setIsOpen] = useState(false);
  const layers = useSelector<State, Layer[]>((s) => s.layers);
  const dispatch = useDispatch<DispatchType>();

  function toggleModal(): void {
    setIsOpen((ps) => !ps);
  }

  function centralizeLayer(l: Layer) {
    return () => {
      l.polygon.getMap().setCenter(l.centroid);
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
        <ul className="nav flex-column">
          <li className="nav-item">
            <button
              className="d-flex align-items-center btn btn-link btn-sm"
              type="button"
              onClick={toggleModal}
              style={{ textDecoration: 'none' }}
            >
              <span className="material-icons">place</span>
              Geocoder
            </button>
          </li>
        </ul>
        <h6 className="sidebar-heading d-flex justify-content-between align-items-center px-3 mt-4 mb-1 text-muted">
          <span>Layers</span>
          <div className="d-flex align-items-center text-muted" aria-label="Add a new report">
            <span className="material-icons">add_circle_outline</span>
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
      {isOpen && (
        <Modal isOpen={isOpen} onClose={toggleModal}>
          <Geocoder onClose={toggleModal} />
        </Modal>
      )}
    </>
  );
}
