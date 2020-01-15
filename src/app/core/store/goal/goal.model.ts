import { firestore } from 'firebase/app';

/** A particular goal that the user inputted. */
export interface Goal {
  __id: string;
  _createdAt?: firestore.Timestamp;
  _updatedAt?: firestore.Timestamp;
  type: GoalType;
  name: string;
  __userId: string;
}

export enum GoalType {
  LONGTERM = 'LONGTERM',
  QUARTER = 'QUARTER',
  WEEKLY = 'WEEKLY', 
}