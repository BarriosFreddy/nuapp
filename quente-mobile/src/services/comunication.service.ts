import {io} from 'socket.io-client';
import appConfig from '../config';

export const EVENTS = {
  CREATE_ROOM: 'create_room',
  LEAVE_ROOM: 'leave_room',
  TO_ROOM: 'to_room',
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
