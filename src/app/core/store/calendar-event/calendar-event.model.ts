import { firestore } from 'firebase/app';

/** A single calendar event. */
export interface CalendarEvent {
  __id: string;
  __userId: string;
  __weekGoalId: string;
  _createdAt?: firestore.Timestamp;
  _updatedAt?: firestore.Timestamp;
  calendarId: string;
  start: firestore.Timestamp;
  end: firestore.Timestamp;
  summary: string;
  description?: string;
};
