import { firestore } from 'firebase/app';

/** A single calendar event. */
export interface CalendarEvent {
  __id: string;
  __userId: string;
  __weekGoalId: string;
  _createdAt?: firestore.Timestamp;
  _updatedAt?: firestore.Timestamp;
  calendarId: string;
  start: {
    dateTime: string;
    timeZone: string;
  };
  end: {
    dateTime: string;
    timeZone: string;
  };
  summary: string;
  description: string;
};
