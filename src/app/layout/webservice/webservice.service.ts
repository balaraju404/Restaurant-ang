import { Injectable } from '@angular/core';
import { Constants } from '../../utils/constants.service';

const SOCKET_URL = Constants.NODE_URL
@Injectable({
  providedIn: 'root',
})

export class WebSocketService {
  private socket: WebSocket;

  constructor() {
    this.connect();
  }

  connect(): void {
    // Replace this URL with your WebSocket server's URL
    this.socket = new WebSocket(SOCKET_URL);

    this.socket.onopen = () => {
      console.log('WebSocket connection established');
    };

    this.socket.onmessage = (event) => {
      const message = JSON.parse(event.data);
      if (message.type === 'NEW_ORDER') {
        console.log('New order received:', message.data);
        // Here, you can update your UI with the new order
      }
    };

    this.socket.onclose = () => {
      console.log('WebSocket connection closed');
    };

    this.socket.onerror = (error) => {
      console.error('WebSocket error:', error);
    };
  }

  sendOrderUpdate(order: any): void {
    if (this.socket.readyState === WebSocket.OPEN) {
      this.socket.send(JSON.stringify(order));
    } else {
      console.error('WebSocket is not open');
    }
  }
}
