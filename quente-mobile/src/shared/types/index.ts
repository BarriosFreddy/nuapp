import {MapShapeType} from 'react-native-leaflet-view';

export type DistanceType = {
  text: string;
  value: number;
};

export type LatLng = {
  lat: number;
  lng: number;
};

export type LatitudeLongitude = {
  latitude: number;
  longitude: number;
};

export type GeoPoint = {
  displayName: string;
  position: {latitude: number; longitude: number};
};

export type MapMarkerType = {
  id: string;
  position: {
    latitude: number;
    longitude: number;
  };
  icon: any;
  size: [number, number];
};

export type MapPolyline = {
  shapeType: MapShapeType;
  id: string;
  color: string;
  positions: Array<LatLng>;
};

export type MarkerType = {
  title: string;
  latlng: {latitude: number; longitude: number};
};

export type LoginType = {
  email: string;
  password: string;
};
