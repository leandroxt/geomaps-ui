import React, { ReactElement, useState } from 'react';
import axios from 'axios';
// @ts-ignore
import L from 'leaflet';
import Header from 'view/shared/header';
import Sidebar from 'view/sidebar';
import Map from 'view/map';

import './app.css';

export interface Layer {
  id: number;
  name: string;
  geom: { remove: () => void },
}

function App(): ReactElement {
  const [layers, setLayers] = useState<Layer[]>([]);
  const [map, setMap] = useState<unknown>(null);

  async function search(city: string): Promise<void> {
    const response = await axios.get(`/api/municipio?name=${city}`);
    const { id, name, geom } = response.data;

    const foundLayer = layers.find((l) => l.id === id);

    if (foundLayer) {
      // eslint-disable-next-line no-alert
      alert('Essa layer já existe!');
      return;
    }

    const layer = L.geoJSON(JSON.parse(geom), {
      style() {
        return { color: '#0000ff' };
      },
    }).bindPopup(() => response.data.name).addTo(map);

    setLayers((ps) => [...ps, { id, name, geom: layer }]);
  }

  function removeLayer(layer: Layer): void {
    setLayers((ps) => ps.filter((l) => l.id !== layer.id));
    layer.geom.remove();
  }

  return (
    <>
      <Header onSelectLayer={search} />
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
