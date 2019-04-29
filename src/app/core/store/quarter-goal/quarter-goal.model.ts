import { firestore } from 'firebase/app';

/** High-level quarter-long goals */
export interface QuarterGoal {
  __id: string;
  _createdAt?: firestore.Timestamp;
  _updatedAt?: firestore.Timestamp;
}