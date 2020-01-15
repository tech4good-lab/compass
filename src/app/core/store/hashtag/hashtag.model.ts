import { firestore } from 'firebase/app';

/** A hashtag that is linked to a goal. */
export interface Hashtag {
  __id: string;
  _createdAt?: firestore.Timestamp;
  _updatedAt?: firestore.Timestamp;
  __userId: string;
  name: string;
}
