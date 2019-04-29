import { firestore } from 'firebase/app';

export interface User {
  __id: string;
  _createdAt?: firestore.Timestamp;
  _updatedAt?: firestore.Timestamp;
  name: string;
  email: string;
  photoURL?: string;
  tokens?: {
    [index: string]: any;
  };
}