import axios from 'axios';

import placesMock from '../utils/mock/placesMock.json';
import geocodingMock from '../utils/mock/geocodingMock.json';
import reverseGeocodingMock from '../utils/mock/reverseGeocodingMock.json';


export default class GeoService {
  private static instance: GeoService;
  private API_KEY = '65ee82e6c2100545286446pfy51f634';

  private constructor() {}

  public static getInstance(): GeoService {
    if (!GeoService.instance) {
      GeoService.instance = new GeoService();
    }

    return GeoService.instance;
  }

  async getPlaces(searchTerm: string) {
    try {
      if (!searchTerm) return;
      /*       const url = `https://geocode.maps.co/search?q=${searchTerm}&api_key=${this.API_KEY}`;
      console.log({url});

      const response = await axios.get(url);
      */
      let response = {
        status: 200,
        data: placesMock.predictions,
      };
      return response;
    } catch (e) {
      console.error(e);
    }
  }

  async getGeoPoint(place: any) {
    try {
      if (!place) return;

      const placeGeoCoding = geocodingMock.results.find(({place_id}) => place_id === place.place_id)

      let response = {
        status: 200,
        data: placeGeoCoding
      };
      return response;
    } catch (e) {
      console.error(e);
    }
  }

  async getDirection(latitude: number, longitude: number) {
    try {
      if (latitude && longitude) {
        const direction = reverseGeocodingMock.results.shift()

        let response = {
          status: 200,
          data: direction
        };
        return response;
      }
    } catch (error) {
      console.error(error);
      
    }
  }
}
