import React, { ReactElement, useEffect, useState } from 'react';
import Loading from 'view/shared/loading';
import { setGoogleMap } from 'modules/map';

import { MAP_ID } from './vars';

const style = { height: '95vh' };

export default function Map(): ReactElement {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      const el = document.getElementById(MAP_ID) as HTMLElement;
      const map: google.maps.Map = new google.maps.Map(el, {
        center: { lat: -22.909518, lng: -47.062351 },
        zoom: 10,
      });

      setGoogleMap(map);
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
