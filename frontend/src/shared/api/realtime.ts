import { Client } from '@stomp/stompjs'
import SockJS from 'sockjs-client'

export const REALTIME_TOPICS = ['/topic/products', '/topic/organizations', '/topic/persons'] as const
export type RealtimeTopic = (typeof REALTIME_TOPICS)[number]

interface RealtimeHandlers {
  onConnect: () => void
  onTopicMessage: (topic: RealtimeTopic) => void
}

export function createRealtimeConnection(handlers: RealtimeHandlers) {
  const client = new Client({
    webSocketFactory: () => new SockJS('/ws'),
    reconnectDelay: 3000,
    onConnect: () => {
      handlers.onConnect()
      for (const topic of REALTIME_TOPICS) {
        client.subscribe(topic, () => handlers.onTopicMessage(topic))
      }
    },
  })

  client.activate()

  return {
    close: () => {
      void client.deactivate()
    },
  }
}
