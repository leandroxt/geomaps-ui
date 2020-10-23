import React, {
  ChangeEvent, FormEvent, ReactElement, useState,
} from 'react';
import axios from 'modules/axios';
import { createCircle } from 'modules/map';

interface Props {
  event: google.maps.drawing.OverlayCompleteEvent;
  drawingManager: google.maps.drawing.DrawingManager;
  onClose: () => void;
}

export default function InterestArea({
  event,
  drawingManager,
  onClose,
}: Props): ReactElement<Props> {
  const [areaName, setAreaName] = useState('');
  function onChangeName({ currentTarget }: ChangeEvent<HTMLInputElement>): void {
    setAreaName(() => currentTarget.value);
  }
  async function onSubmitSearch(e: FormEvent<HTMLFormElement>): Promise<void> {
    e.preventDefault();

    if (event.type === google.maps.drawing.OverlayType.CIRCLE) {
      const mapsCircle = event.overlay as google.maps.Circle;
      const map = mapsCircle.getMap();
      const center = mapsCircle.getCenter();
      const circle: {
        name: string;
        center: google.maps.LatLngLiteral;
        radius: number;
      } = {
        name: areaName,
        center: {
          lat: center.lat(),
          lng: center.lng(),
        },
        radius: mapsCircle.getRadius(),
      };

      try {
        const response = await axios.post('/area', circle, {
          headers: { 'Content-type': 'application/json' },
        });
        if (response.status === 200 || response.status === 201) {
          const mc = createCircle(mapsCircle.getCenter(), mapsCircle.getRadius());
          mc.setMap(map);

          const infoWindow = new google.maps.InfoWindow();
          mc.addListener('click', (mEvent) => {
            const contentString = `<b>${areaName}</b><br>Coordenada da área: <br>${mEvent.latLng.lat()},${mEvent.latLng.lng()}<br>`;

            // Replace the info window's content and position.
            infoWindow.setContent(contentString);
            infoWindow.setPosition(mEvent.latLng);

            infoWindow.open(map as google.maps.Map<Element>);
          });

          mapsCircle.setMap(null);
          onClose();
          drawingManager.setDrawingMode(null);
        }
      } catch (error) {
        // eslint-disable-next-line no-alert
        alert('Erro ao salvar área de interesse');
      }

      return;
    }

    // eslint-disable-next-line no-alert
    alert('Only circles will be saved');
  }

  return (
    <form onSubmit={onSubmitSearch}>
      <div className="form-group">
        <label htmlFor="recipient-name" className="col-form-label">Digite o nome da área de interesse:</label>
        <input
          required
          type="text"
          className="form-control"
          value={areaName}
          onChange={onChangeName}
        />
      </div>
      <div className="modal-footer">
        <button type="submit" className="btn btn-primary">Salvar</button>
      </div>
    </form>
  );
}
