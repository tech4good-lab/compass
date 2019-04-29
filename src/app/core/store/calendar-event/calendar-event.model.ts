import { firestore } from 'firebase/app';

/** A single calendar event. */
export interface CalendarEvent {
  __id: string;
  _createdAt?: firestore.Timestamp;
  _updatedAt?: firestore.Timestamp;
}