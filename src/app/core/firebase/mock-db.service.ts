import { Injectable } from '@angular/core';

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

    return {
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