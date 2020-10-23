import React, { ReactElement, useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import Loading from 'view/shared/loading';
import Modal from 'view/shared/modal';
import InterestArea from 'view/features/interest-area';
import { setGoogleMap } from 'modules/map';

import { MAP_ID } from './vars';

const style = { height: '95vh' };

export default function Map(): ReactElement {
  const [loading, setLoading] = useState(true);

  function closeModal(wrapper: HTMLDivElement): () => void {
    return () => {
      ReactDOM.unmountComponentAtNode(wrapper);
      document.body.removeChild(wrapper);
    };
  }

  function openDrawingModal(
    event: google.maps.drawing.OverlayCompleteEvent,
    drawingManager: google.maps.drawing.DrawingManager,
  ): void {
    const wrapper = document.body.appendChild(document.createElement('div'));
    ReactDOM.render(
      <Modal isOpen onClose={closeModal(wrapper)}>
        <InterestArea event={event} drawingManager={drawingManager} onClose={closeModal(wrapper)} />
      </Modal>,
      wrapper,
    );
  }

  useEffect(() => {
    setTimeout(() => {
      const el = document.getElementById(MAP_ID) as HTMLElement;
      const map: google.maps.Map = new google.maps.Map(el, {
        center: { lat: -22.909518, lng: -47.062351 },
        zoom: 10,
      });

      setGoogleMap(map, openDrawingModal);
      setLoading(() => false);
    }, 1000);
  }, []);

  return (
    <>
      {loading && (
        <Loading style={style} />
      )}
      <div id={MAP_ID} style={style} />
    </>
  );
}
