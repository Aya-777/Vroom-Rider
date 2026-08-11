import {
  Pusher,
  PusherEvent,
  PusherAuthorizerResult,
} from '@pusher/pusher-websocket-react-native';

import { apiClient } from '../../network/apiClient';
import { ENDPOINTS } from '../../network/endpoints';
import { PUSHER_CONFIG } from '../../config/realtime.config';

const PUSHER_AUTH_ENDPOINT = ENDPOINTS.PUSHER.AUTH;

class PusherService {
  private pusher = Pusher.getInstance();
  private initialized = false;

  async init(): Promise<void> {
    if (this.initialized) {
      return;
    }

    await this.pusher.init({
      apiKey: PUSHER_CONFIG.key,
      cluster: PUSHER_CONFIG.cluster,
      useTLS: PUSHER_CONFIG.useTLS,

      onAuthorizer: this.authorizeChannel.bind(this),

      onConnectionStateChange: (currentState, previousState) => {
        console.log(
          `[Pusher] Connection: ${previousState} → ${currentState}`,
        );
      },

      onError: (message, code, error) => {
        console.error(
          `[Pusher] Error: ${message}`,
          {
            code,
            error,
          },
        );
      },

      onSubscriptionSucceeded: (channelName, data) => {
        console.log(
          `[Pusher] Successfully subscribed: ${channelName}`,
          data,
        );
      },

      onSubscriptionError: (message, error) => {
        console.error(
          `[Pusher] Subscription error: ${message}`,
          error,
        );
      },

      onEvent: (event: PusherEvent) => {
        console.log(
          `[Pusher] Event received: ${event.eventName}`,
          event.data,
        );
      },
    });

    this.initialized = true;

    console.log('[Pusher] Initialized');
  }

  private async authorizeChannel(
    channelName: string,
    socketId: string,
  ): Promise<PusherAuthorizerResult> {
    try {
      console.log('[Pusher] Authorizing channel:', {
        channelName,
        socketId,
      });

      const response = await apiClient.post(
        PUSHER_AUTH_ENDPOINT,
        {
          channel_name: channelName,
          socket_id: socketId,
        },
      );

      console.log('[Pusher] Authorization successful:', channelName);

      return response.data;
    } catch (error) {
      console.error(
        '[Pusher] Channel authorization failed:',
        error,
      );

      throw error;
    }
  }

  async connect(): Promise<void> {
    await this.init();

    console.log('[Pusher] Connecting...');

    await this.pusher.connect();
  }

  async disconnect(): Promise<void> {
    console.log('[Pusher] Disconnecting...');

    await this.pusher.disconnect();
  }

  async subscribe(channelName: string): Promise<void> {
    await this.init();

    console.log('[Pusher] Subscribing to:', channelName);

    await this.pusher.subscribe({
      channelName,
    });
  }

  async unsubscribe(channelName: string): Promise<void> {
    console.log('[Pusher] Unsubscribing from:', channelName);

    await this.pusher.unsubscribe({
      channelName,
    });
  }

  getSocketId(): Promise<string> {
    return this.pusher.getSocketId();
  }
}

export const pusherService = new PusherService();