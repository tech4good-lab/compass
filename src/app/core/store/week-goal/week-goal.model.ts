import { firestore } from 'firebase/app';

/** Concrete goals to be completed in the next week. */
export interface WeekGoal {
  __id: string;
  __userId: string;
  _createdAt?: firestore.Timestamp;
  _updatedAt?: firestore.Timestamp;
  text: string;
  hashtag: string;
  completedAt: firestore.Timestamp;
}
