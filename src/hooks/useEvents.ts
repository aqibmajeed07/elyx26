import { useState, useEffect, useCallback } from 'react';
import type { CulturalEvent, EventStatus } from '../types';
import { INITIAL_EVENTS } from '../data/seedData';
import { eventService } from '../services/eventService';

export const useEvents = () => {
  const [events, setEvents] = useState<CulturalEvent[]>(() => {
    const saved = localStorage.getItem('elyx26_events_cache');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        return INITIAL_EVENTS;
      }
    }
    return INITIAL_EVENTS;
  });
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchEvents = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    const res = await eventService.fetchEvents();
    if (res.error) {
      setError(res.error.message);
    } else {
      setEvents(res.data);
    }
    setIsLoading(false);
  }, []);

  useEffect(() => {
    fetchEvents();
  }, [fetchEvents]);

  const getEventBySlug = (slug: string): CulturalEvent | undefined => {
    return events.find((e) => e.slug === slug || e.id === slug);
  };

  const getEventById = (id: string): CulturalEvent | undefined => {
    return events.find((e) => e.id === id);
  };

  // Admin capability: update event
  const updateEvent = async (updated: CulturalEvent): Promise<{ success: boolean; error?: string }> => {
    const res = await eventService.updateEvent(updated);
    if (res.success) {
      setEvents((prev) => {
        const next = prev.map((e) => (e.id === updated.id ? updated : e));
        localStorage.setItem('elyx26_events_cache', JSON.stringify(next));
        return next;
      });
    }
    return res;
  };

  // Admin capability: create event
  const createEvent = async (event: CulturalEvent): Promise<{ success: boolean; error?: string }> => {
    const res = await eventService.createEvent(event);
    if (res.success) {
      await fetchEvents();
    }
    return res;
  };

  // Admin capability: delete event
  const deleteEvent = async (eventId: string): Promise<{ success: boolean; error?: string }> => {
    const res = await eventService.deleteEvent(eventId);
    if (res.success) {
      setEvents((prev) => prev.filter((e) => e.id !== eventId));
    }
    return res;
  };

  // Admin capability: toggle event status
  const updateEventStatus = async (eventId: string, newStatus: EventStatus) => {
    const res = await eventService.updateEventStatus(eventId, newStatus);
    if (res.success) {
      setEvents((prev) => {
        const next = prev.map((e) => (e.id === eventId ? { ...e, status: newStatus } : e));
        localStorage.setItem('elyx26_events_cache', JSON.stringify(next));
        return next;
      });
    }
    return res;
  };

  return {
    events,
    isLoading,
    error,
    refreshEvents: fetchEvents,
    getEventBySlug,
    getEventById,
    createEvent,
    updateEvent,
    deleteEvent,
    updateEventStatus,
  };
};
