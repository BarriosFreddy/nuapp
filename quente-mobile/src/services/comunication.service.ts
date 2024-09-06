import {io} from 'socket.io-client';
import appConfig from '../config';

export const EVENTS = {
  TO_NEW_RIDE: 'to_new_trip',
  FROM_NEW_RIDE: 'from_new_trip',
  TO_REMOVED_RIDE: 'to_removed_trip',
  FROM_REMOVED_RIDE: 'from_removed_trip',
  DRIVERS_ONLINE: 'driversOnline',
  CREATE_ROOM: 'create_room',
  LEAVE_ROOM: 'leave_room',
  TO_ROOM: 'to_room',
  TO_UPDATE_POSITION_MARKER: 'to_update_position_marker',
  FROM_UPDATE_POSITION_MARKER: 'from_update_position_marker',
};

class ComunicationService {
  private socket;
  constructor() {
    this.socket = io(appConfig.API_URL, {
      transports: ['websocket'],
      upgrade: false,
    });
  }

  /**
   * @param event string
   * @param message object
   */
  sendMessage(event: string, message: any) {
    this.socket.emit(event, message);
  }

  /**
   * Subscribe to an event
   *
   * @param event string
   * @param callback function
   */
  subscribe(event: string, callback: (...args: any[]) => void) {
    this.socket.on(event, callback);
  }

  /**
   * Unsubscribe to an event
   *
   * @param event string
   * @param callback function
   */
  unsubscribe(event: string, callback: (...args: any[]) => void) {
    this.socket.off(event, callback);
  }

  /**
   *
   * @param {string} room
   * @param {object} message
   */
  sendMessageToRoom(room: string, message: any) {
    this.socket.emit(EVENTS.CREATE_ROOM, room);
    this.socket.emit(EVENTS.TO_ROOM, JSON.stringify(message));
  }

  /**
   *
   * @param {string} room
   * @param {function} callback
   */
  receiveMessageFromRoom(room: string, callback: (...args: any[]) => void) {
    this.socket.emit(EVENTS.CREATE_ROOM, room);
    this.socket.on(EVENTS.TO_ROOM, callback);
  }

  /**
   *
   * @param {string} room
   * @param {function} callback
   */
  unsubscribeRoom(room: string) {
    this.socket.emit(EVENTS.LEAVE_ROOM, room);
    this.socket.off(EVENTS.TO_ROOM, undefined);
  }
}

const comunicationService = new ComunicationService();

export default comunicationService;
