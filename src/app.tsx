/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { ReactElement, useState } from 'react';
import axios from 'axios';

import Header from 'view/shared/header';
import Sidebar from 'view/sidebar';
import Map from 'view/map';

import './app.css';

export interface Layer {
  id: number;
  name: string;
  geom: { setMap: (map: google.maps.Map<Element> | null) => void },
}

let infoWindow: google.maps.InfoWindow;

function App(): ReactElement {
  const [layers, setLayers] = useState<Layer[]>([]);
  const [map, setMap] = useState<google.maps.Map<Element> | null>(null);

  async function onSelectLayer(cityID: number): Promise<void> {
    const response = await axios.get(`/api/municipio?cityID=${cityID}`);
    const {
      id, name, geom, centroid,
    } = response.data;
    const coordZoomLayer = centroid.match(/(-?|\+?)?\d+(\.\d+)?/g)
      .map((c: string) => parseFloat(c));
    const setCenter: google.maps.LatLngLiteral = {
      lng: coordZoomLayer[0],
      lat: coordZoomLayer[1],
    };

    const foundLayer = layers.find((l) => l.id === id);

    if (foundLayer) {
      // eslint-disable-next-line no-alert
      alert('Essa layer já existe!');
      return;
    }

    const { coordinates } = JSON.parse(geom);

    const paths: google.maps.LatLngLiteral[] = coordinates[0].map((c: number[]) => ({
      lng: c[0],
      lat: c[1],
    }));

    const layer = new google.maps.Polygon({
      paths,
      strokeColor: '#0000FF',
      strokeOpacity: 0.8,
      strokeWeight: 3,
      fillColor: '#0000FF',
      fillOpacity: 0.35,
    });
    layer.setMap(map);
    if (map) {
      map.setCenter(setCenter);
    }

    infoWindow = new google.maps.InfoWindow();
    layer.addListener('click', (event: any) => {
      const contentString = `<b>${name}</b><br>Coordenada do click: <br>${event.latLng.lat()},${event.latLng.lng()}<br>`;

      // Replace the info window's content and position.
      infoWindow.setContent(contentString);
      infoWindow.setPosition(event.latLng);

      infoWindow.open(map as google.maps.Map<Element>);
    });

    setLayers((ps) => [...ps, { id, name, geom: layer }]);
  }

  function removeLayer(layer: Layer): void {
    setLayers((ps) => ps.filter((l) => l.id !== layer.id));
    layer.geom.setMap(null);
  }

  return (
    <>
      <Header onSelectLayer={onSelectLayer} />
      <div className="container-fluid">
        <div className="row">

          <nav id="sidebarMenu" className="col-md-3 col-lg-2 d-md-block bg-light sidebar collapse">
            <Sidebar layers={layers} onRemoveLayer={removeLayer} />
          </nav>

          <main role="main" className="col-md-9 ml-sm-auto col-lg-10 px-md-4 map-pad">
            <Map setMap={setMap} />
          </main>

        </div>
      </div>
    </>
  );
}

export default App;
