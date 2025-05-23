import type { Event } from "@/entities/Event";

import { api } from "@/shared/api";

export function subscribe(eventId: number) {
  return api.post<Event>(`/events/${eventId}/subscription`);
}

export function unsubscribe(eventId: number) {
  return api.delete<Event>(`/events/${eventId}/subscription`);
}
