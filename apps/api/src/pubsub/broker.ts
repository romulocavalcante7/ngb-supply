import { Subscriber, EventPayload } from './types';

class PubSubBroker {
  // Map of topic -> Set of subscribers
  private subscribers = new Map<string, Set<Subscriber>>();

  /**
   * Subscribes a consumer to a specific topic.
   */
  subscribe(topic: string, subscriber: Subscriber): void {
    if (!this.subscribers.has(topic)) {
      this.subscribers.set(topic, new Set());
    }
    this.subscribers.get(topic)!.add(subscriber);
    console.log(`[Broker] Subscriber ${subscriber.id} subscribed to topic: ${topic}`);
  }

  /**
   * Unsubscribes a consumer from a specific topic.
   */
  unsubscribe(topic: string, subscriber: Subscriber): void {
    if (this.subscribers.has(topic)) {
      this.subscribers.get(topic)!.delete(subscriber);
      console.log(`[Broker] Subscriber ${subscriber.id} unsubscribed from topic: ${topic}`);
    }
  }

  /**
   * Publishes a message to a specific topic.
   * All subscribed consumers will receive the message.
   */
  publish(topic: string, message: EventPayload): void {
    console.log(`[Broker] Publishing message to topic: ${topic}`, message);
    if (this.subscribers.has(topic)) {
      this.subscribers.get(topic)!.forEach((subscriber) => {
        try {
          subscriber.onMessage(topic, message);
        } catch (error) {
          console.error(`[Broker] Error in subscriber ${subscriber.id} for topic ${topic}:`, error);
        }
      });
    } else {
      console.log(`[Broker] No subscribers for topic: ${topic}`);
    }
  }
}

export const broker = new PubSubBroker();
