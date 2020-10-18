import React, { ReactElement, useEffect } from 'react';
// @ts-ignore
import L from 'leaflet';

import {
  MAP_ID,
  MB_ATTR,
  MB_URL,
} from './vars';

interface Props {
  setMap: (map: React.SetStateAction<unknown>) => void
}

export default function Map({ setMap }: Props): ReactElement<Props> {
  useEffect(() => {
    const map = L.map(MAP_ID).setView([-22.909518, -47.062351], 11);

    L.tileLayer(MB_URL, {
      attribution: MB_ATTR,
      maxZoom: 18,
      id: 'mapbox/streets-v11',
      tileSize: 512,
      zoomOffset: -1,
      accessToken: 'your.mapbox.access.token',
    }).addTo(map);

    setMap(() => map);
  }, [setMap]);

  return (
    <div id={MAP_ID} style={{ height: '95vh' }} />
  );
}
