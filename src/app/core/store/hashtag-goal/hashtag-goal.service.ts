import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CachedSelectorsService } from '../cached-selectors.service';
import { FirebaseService } from '../../firebase/firebase.service';
import { HashtagGoal } from './hashtag-goal.model';

@Injectable({
  providedIn: 'root',
})
export class HashtagGoalService {

  constructor(
    private cs: CachedSelectorsService,
    private db: FirebaseService,
  ) { }

  /** Select a hashtagGoal from the store. */
  public selectHashtagGoal = <T extends HashtagGoal>(
    id: string,
    correlationId: string,
    childrenFn?: (e: HashtagGoal) => { [index: string]: Observable<any> },
  ): Observable<T> => {

    return this.cs.selectEntityObj<HashtagGoal, T>('hashtagGoal', id, correlationId, childrenFn);
  }

  /** Select hashtagGoals from the store. */
  public selectHashtagGoals = <T extends HashtagGoal>(
    queryParams: [string, string, any][],
    correlationId: string,
    childrenFn?: (e: HashtagGoal) => { [index: string]: Observable<any> },
  ): Observable<Array<T>> => {

    return this.cs.selectEntityList<HashtagGoal, T>('hashtagGoal', queryParams, correlationId, childrenFn);
  }

  /** Get a hashtagGoal directly from the database. */
  public getHashtagGoal = <T extends HashtagGoal>(
    id: string,
    childrenFn?: (e: HashtagGoal) => { [index: string]: Observable<any> },
  ): Observable<T> => {

    return this.db.queryObjOnce<HashtagGoal, T>('hashtagGoals', id, childrenFn);
  }

  /** Get hashtagGoals directly from the database. */
  public getHashtagGoals = <T extends HashtagGoal>(
    queryParams: [string, string, any][],
    queryOptions?: { [index: string]: any },
    childrenFn?: (e: HashtagGoal) => { [index: string]: Observable<any> },
  ): Observable<Array<T>> => {

    return this.db.queryListOnce<HashtagGoal, T>('hashtagGoals', queryParams, queryOptions, childrenFn);
  }
}
