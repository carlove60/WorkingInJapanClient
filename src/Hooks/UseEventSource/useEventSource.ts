import { useEffect, useRef } from "react";

export interface EventSourceHandler {
  url: string;
  onMessage: (event: MessageEvent) => void;
}

export const useEventSource = (handlers: EventSourceHandler[], waitForValue: unknown, stopOnUnmount = true) => {
  const eventSourcesRef = useRef<EventSource[]>([]);

  useEffect(() => {
    // Initialize connections
    if (waitForValue) {
      eventSourcesRef.current = handlers.map(({ url, onMessage }) => {
        const eventSource = new EventSource(url, {
          withCredentials: true,
        });
        eventSource.onmessage = onMessage;
        return eventSource;
      });

      return () => {
        if (stopOnUnmount) {
          eventSourcesRef.current.forEach((es) => es.close());
        }
      };
    }
  }, [waitForValue]);

  // Provide a function to re-open the EventSource connections
  const reopenConnections = () => {
    // Close the existing connections
    eventSourcesRef.current.forEach((es) => es.close());

    // Recreate new connections
    eventSourcesRef.current = handlers.map(({ url, onMessage }) => {
      const eventSource = new EventSource(url, {
        withCredentials: true,
      });
      eventSource.onmessage = onMessage;
      return eventSource;
    });
  };

  const closeConnection = (url: string) => {
    eventSourcesRef.current.filter((es) => es.url === url).forEach((es) => es.close());
  };

  return { reopenConnections, closeConnection };
};
