import { firestore } from 'firebase/app';

/** Concrete goals to be completed in the next week. */
export interface WeekGoal {
  __id: string;
  _createdAt?: firestore.Timestamp;
  _updatedAt?: firestore.Timestamp;
}