import { firestore } from 'firebase/app';

export enum SetupType {
  INITIAL = 'initial',
  NEW_WEEK = 'week',
  NEW_QUARTER = 'quarter'
};

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
  longTermGoals: {
    oneYear: string;
    fiveYear: string;
  };
  lastCompletedWeeklySetup: firestore.Timestamp;
  setupInProgress?: {
    type: SetupType;
    currentStep: number;
    longTermGoals?: {
      oneYear: string;
      fiveYear: string;
    };
    quarterGoals?: {
      goalOne: string;
      goalTwo: string;
      goalThree: string;
    };
    weekGoals?: Array<{
      text: string;
      hashtag: string;
      hoursScheduled: number;
    }>;
  };
};
