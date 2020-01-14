import { firestore } from 'firebase/app';

/** The correlation between a hashtag and a goal */
export interface HashtagGoal {
  __id: string;
  _createdAt?: firestore.Timestamp;
  _updatedAt?: firestore.Timestamp;
}
