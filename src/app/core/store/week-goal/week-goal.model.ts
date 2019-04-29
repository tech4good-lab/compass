import { firestore } from 'firebase/app';

/** Concrete goals to be completed in the next week. */
export interface WeekGoal {
  __id: string;
  __userId: string;
  _createdAt?: firestore.Timestamp;
  _updatedAt?: firestore.Timestamp;
  text: string;
  // 0, 1, or 2. This is used to determine the corresponding color
  index: number;
  hashtag: string;
  completed: boolean;
  completedAt?: firestore.Timestamp;
}
