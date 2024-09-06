import {ApiResponse} from 'apisauce';
import {api} from './api';
import {Ride} from '../models/RideStore';
import comunicationService, {EVENTS} from './comunication.service';

class RideRequestService {
  constructor() {}

  async save(ride: Ride) {
    let rideSaved = null;
    const response: ApiResponse<any> = await api.apisauce.post(`trips`, ride);
    if (response.ok) {
      const {_id, origin, destination, clientPrice, comments, type, mapData, passenger, status, rideDistance} =
        response.data;
      rideSaved = {
        _id,
        origin,
        destination,
        clientPrice,
        comments,
        type,
        mapData,
        passenger,
        status,
        rideDistance
      };
    }
    await comunicationService.sendMessage(EVENTS.TO_NEW_RIDE, {...rideSaved});
    return rideSaved;
  }
  async update(ride: Ride) {
    let rideSaved = null;
    const { _id, ...rideToUpdate } = ride
    const response: ApiResponse<any> = await api.apisauce.put(`trips/${_id}`, rideToUpdate);
    if (response.ok) {
      const {_id, origin, destination, clientPrice, comments, type, status} =
        response.data;
      rideSaved = {
        _id,
        origin,
        destination,
        clientPrice,
        comments,
        type,
        status
      };
    }
    return rideSaved;
  }
  async getRideRequests(authToken: string) {
    api.apisauce.setHeaders({
      Authorization: `Bearer ${authToken}`,
    });
    const response: ApiResponse<Array<Ride>> = await api.apisauce.get(`trips?status=PENDING`);
    return response;
  }
}

const rideRequestService = new RideRequestService();
export default rideRequestService;
