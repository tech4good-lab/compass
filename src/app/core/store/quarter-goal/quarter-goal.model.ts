import { firestore } from 'firebase/app';

/** High-level quarter-long goals */
export interface QuarterGoal {
  __id: string;
  __userId: string;
  _createdAt?: firestore.Timestamp;
  _updatedAt?: firestore.Timestamp;
  text: string;
  completed: boolean;
  completedAt?: firestore.Timestamp;
}
