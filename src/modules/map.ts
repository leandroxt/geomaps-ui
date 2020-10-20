import axios from 'modules/axios';

let map: google.maps.Map<Element>;
let infoWindow: google.maps.InfoWindow;

export interface Layer {
  id: number;
  name: string;
  centroid: google.maps.LatLngLiteral;
  polygon: google.maps.Polygon;
}

export function setGoogleMap(googleMap: google.maps.Map<Element>): void {
  map = googleMap;
}

// function createCircle(center: google.maps.LatLng, radius: number): google.maps.Circle {
//   return new google.maps.Circle({
//     strokeColor: '#FF0000',
//     strokeOpacity: 0.8,
//     strokeWeight: 2,
//     fillColor: '#FF0000',
//     fillOpacity: 0.35,
//     center,
//     radius,
//   });
// }

function createPolygon(paths: google.maps.LatLngLiteral[]): google.maps.Polygon {
  return new google.maps.Polygon({
    paths,
    strokeColor: '#0000FF',
    strokeOpacity: 0.8,
    strokeWeight: 3,
    fillColor: '#0000FF',
    fillOpacity: 0.35,
  });
}

// function placeMarkerAndPanTo(latLng: google.maps.LatLng): void {
//   const marker = new google.maps.Marker({
//     position: latLng,
//   });
//   marker.setMap(map);
//   map.panTo(latLng);
// }

// export function onClickMap(e: google.maps.MouseEvent): void {
//   placeMarkerAndPanTo(e.latLng);
// }

export async function onCreatePolygon(cityID: number): Promise<Layer> {
  const { data } = await axios.get(`/municipio?cityID=${cityID}`);
  const {
    id,
    name,
    geom,
    centroid,
  } = data;
  const { coordinates } = JSON.parse(geom);

  const paths: google.maps.LatLngLiteral[] = coordinates[0].map((c: number[]) => ({
    lng: c[0],
    lat: c[1],
  }));

  const layer = createPolygon(paths);

  layer.setMap(map);

  const coordZoomLayer: number[] = centroid.match(/(-?|\+?)?\d+(\.\d+)?/g)
    .map((c: string) => parseFloat(c));
  const mapCenter = {
    lng: coordZoomLayer[0],
    lat: coordZoomLayer[1],
  };
  map.setCenter(mapCenter);
  map.setZoom(10);

  infoWindow = new google.maps.InfoWindow();
  layer.addListener('click', (event: google.maps.MouseEvent) => {
    const contentString = `<b>${name}</b><br>Coordenada do click: <br>${event.latLng.lat()},${event.latLng.lng()}<br>`;

    // Replace the info window's content and position.
    infoWindow.setContent(contentString);
    infoWindow.setPosition(event.latLng);

    infoWindow.open(map as google.maps.Map<Element>);
  });

  return {
    id,
    name,
    centroid: mapCenter,
    polygon: layer,
  };
}
