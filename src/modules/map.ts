import axios from 'modules/axios';

// https://turfjs.org/

let map: google.maps.Map<Element>;
let infoWindow: google.maps.InfoWindow;

export interface Layer {
  id: number;
  name: string;
  centroid: google.maps.LatLngLiteral;
  polygon: google.maps.Polygon;
}

function drawManager(openDrawer: (
  e: google.maps.drawing.OverlayCompleteEvent,
  drawingManager: google.maps.drawing.DrawingManager,
) => void): void {
  const drawingManager = new google.maps.drawing.DrawingManager({
    drawingMode: null,
    drawingControl: true,
    drawingControlOptions: {
      position: google.maps.ControlPosition.TOP_CENTER,
      drawingModes: [
        google.maps.drawing.OverlayType.MARKER,
        google.maps.drawing.OverlayType.CIRCLE,
        google.maps.drawing.OverlayType.POLYGON,
        google.maps.drawing.OverlayType.POLYLINE,
        google.maps.drawing.OverlayType.RECTANGLE,
      ],
    },
    circleOptions: {
      fillColor: '#ff0000',
      fillOpacity: 0.6,
      strokeWeight: 2,
      clickable: false,
      editable: true,
      zIndex: 1,
    },
  });
  drawingManager.setMap(map);

  google.maps.event.addListener(drawingManager, 'overlaycomplete', (event: google.maps.drawing.OverlayCompleteEvent) => {
    openDrawer(event, drawingManager);
  });
}

export function setGoogleMap(
  googleMap: google.maps.Map<Element>,
  openDrawer: (
    e: google.maps.drawing.OverlayCompleteEvent,
    drawingManager: google.maps.drawing.DrawingManager,
  ) => void,
): void {
  map = googleMap;
  drawManager(openDrawer);
}

export function createCircle(center: google.maps.LatLng, radius: number): google.maps.Circle {
  return new google.maps.Circle({
    strokeColor: '#FF0000',
    strokeOpacity: 0.8,
    strokeWeight: 2,
    fillColor: '#FF0000',
    fillOpacity: 0.35,
    center,
    radius,
  });
}

function fromCoordinatesToGoogleMapPaths(p: Array<number[][]>): google.maps.LatLngLiteral[] {
  const [coordinates] = p;
  return coordinates.map((c): google.maps.LatLngLiteral => ({
    lng: c[0],
    lat: c[1],
  }));
}

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

export function placeMarkerAndPanTo(latLng: google.maps.LatLngLiteral): void {
  const marker = new google.maps.Marker({
    position: latLng,
    animation: google.maps.Animation.DROP,
  });
  marker.setMap(map);
  map.setZoom(18);
  map.panTo(latLng);
}

export function panToAndZoom(latLng: google.maps.LatLngLiteral): void {
  map.setZoom(12);
  map.panTo(latLng);
}

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

  const paths = fromCoordinatesToGoogleMapPaths(coordinates);
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
