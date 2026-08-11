import React, { useEffect } from 'react';
import { pusherService } from './PusherService';

export function PusherProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  useEffect(() => {
    let mounted = true;

    const setup = async () => {
      try {
        await pusherService.connect();

        if (!mounted) {
          return;
        }

        const channels =
          await pusherService.subscribeToUserChannels();

        console.log(
          '[Pusher] App subscribed to:',
          channels,
        );
      } catch (error) {
        console.error(
          '[Pusher] App setup failed:',
          error,
        );
      }
    };

    setup();

    return () => {
      mounted = false;
      pusherService.disconnect();
    };
  }, []);

  return <>{children}</>;
}