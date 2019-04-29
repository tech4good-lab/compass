import { Injectable } from '@angular/core';
import { firestore } from 'firebase/app';
import { startOfWeek, timestampAfterMilliseconds } from '../utils/date.utils';

@Injectable({
  providedIn: 'root'
})
export class MockDBService {

  /** The current user. */
  currentUser(): { [id: string]: any } {

    return {
      uid: "test-user",
      displayName: "Test User",
      email: "test@sample.com",
      photoURL: 'http://placekitten.com/100/100',
    };
  }

  /** Database entries that are attached to the particular signed in user. Keys are
   * collection names and values are arrays of items. */
  currentUserHardcodedData(currentUserId): { [id: string]: any[] } {

    const beginning = firestore.Timestamp.fromDate(startOfWeek(new Date()));

    return {
      'users': [
        {
          __id: currentUserId,
          _createdAt: beginning,
          _updatedAt: beginning,
          name: "Test User",
          email: "test@sample.com",
          photoURL: 'http://placekitten.com/100/100',
          longTermGoals: {
            oneYear: 'Get an tech internship.',
            fiveYear: 'Be working as a product manager at a company whose mission I believe in.'
          },
          lastCompletedWeeklySetup: beginning
        }
      ],
      'quarterGoals': [
        {
          __id: 'qg1',
          __userId: currentUserId,
          _createdAt: beginning,
          _updatedAt: beginning,
          text: 'Get an A in TIM 158.',
          completed: false,
        },
        {
          __id: 'qg2',
          __userId: currentUserId,
          _createdAt: beginning,
          _updatedAt: beginning,
          text: 'Put together materials for internship search and reach out to recruiters and potential employers.',
          completed: false,
        },
        {
          __id: 'qg3',
          __userId: currentUserId,
          _createdAt: beginning,
          _updatedAt: beginning,
          text: 'Learn to play guitar.',
          completed: false,
        },
      ],
      'weekGoals': [
        {
          __id: 'wg1',
          __userId: currentUserId,
          _createdAt: beginning,
          _updatedAt: beginning,
          text: 'Course homework',
          index: 0,
          hashtag: 'homework',
          completed: false
        },
        {
          __id: 'wg2',
          __userId: currentUserId,
          _createdAt: beginning,
          _updatedAt: beginning,
          text: 'Research and put together resume (draft 1).',
          index: 1,
          hashtag: 'resume',
          completed: false
        },
        {
          __id: 'wg3',
          __userId: currentUserId,
          _createdAt: beginning,
          _updatedAt: beginning,
          text: 'One hour of practicing guitar.',
          index: 2,
          hashtag: 'guitar',
          completed: false
        },
      ],
      'calendarEvents': [
        {
          __id: 'ev1',
          __userId: currentUserId,
          __weekGoalId: 'wg1',
          _createdAt: beginning,
          _updatedAt: beginning,
          calendarId: 'primary',
          start: timestampAfterMilliseconds(beginning, 36*3600000),
          end: timestampAfterMilliseconds(beginning, 38*3600000),
          summary: 'TIM 158 HW'
        },
        {
          __id: 'ev2',
          __userId: currentUserId,
          __weekGoalId: 'wg1',
          _createdAt: beginning,
          _updatedAt: beginning,
          calendarId: 'primary',
          start: timestampAfterMilliseconds(beginning, 56*3600000),
          end: timestampAfterMilliseconds(beginning, 58*3600000),
          summary: 'TIM 158 HW'
        },
        {
          __id: 'ev3',
          __userId: currentUserId,
          __weekGoalId: 'wg1',
          _createdAt: beginning,
          _updatedAt: beginning,
          calendarId: 'primary',
          start: timestampAfterMilliseconds(beginning, 104*3600000),
          end: timestampAfterMilliseconds(beginning, 106*3600000),
          summary: 'TIM 158 HW'
        },
        {
          __id: 'ev4',
          __userId: currentUserId,
          __weekGoalId: 'wg1',
          _createdAt: beginning,
          _updatedAt: beginning,
          calendarId: 'primary',
          start: timestampAfterMilliseconds(beginning, 152*3600000),
          end: timestampAfterMilliseconds(beginning, 156*3600000),
          summary: 'TIM 158 HW'
        },
        {
          __id: 'ev5',
          __userId: currentUserId,
          __weekGoalId: 'wg2',
          _createdAt: beginning,
          _updatedAt: beginning,
          calendarId: 'primary',
          start: timestampAfterMilliseconds(beginning, 68*3600000),
          end: timestampAfterMilliseconds(beginning, 70*3600000),
          summary: 'Work on resume'
        },
        {
          __id: 'ev6',
          __userId: currentUserId,
          __weekGoalId: 'wg3',
          _createdAt: beginning,
          _updatedAt: beginning,
          calendarId: 'primary',
          start: timestampAfterMilliseconds(beginning, 116*3600000),
          end: timestampAfterMilliseconds(beginning, 118*3600000),
          summary: 'Practice guitar'
        },
      ],
    };
  }

  /** Database entries that are not attached to the particular signed in user. Keys are
   * collection names and values are arrays of items. */
  generalHardcodedData(): { [id: string]: any[] } {

    return {
    }
  }

  constructor() { }

  getInitialDBStateChanges(collection) {
    const data = this.generalHardcodedData();
    if (data[collection]) {
      const initData = data[collection].map(entity => {
        return {
          type: 'added',
          result: entity
        };
      });
      return initData;
    } else {
      return [];
    }
  }

  getCurrentUserDBStateChanges(collection, currentUserId) {
    const data = this.currentUserHardcodedData(currentUserId);
    if (data[collection]) {
      return data[collection].map(entity => {
        return {
          type: 'added',
          result: entity
        };
      });
    } else {
      return [];
    }
  }

}
