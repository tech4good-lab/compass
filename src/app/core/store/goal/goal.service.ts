import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CachedSelectorsService } from '../cached-selectors.service';
import { FirebaseService } from '../../firebase/firebase.service';
import { Goal } from './goal.model';

@Injectable({
  providedIn: 'root',
})
export class GoalService {

  constructor(
    private cs: CachedSelectorsService,
    private db: FirebaseService,
  ) { }

  /** Select a goal from the store. */
  public selectGoal = <T extends Goal>(
    id: string,
    correlationId: string,
    childrenFn?: (e: Goal) => { [index: string]: Observable<any> },
  ): Observable<T> => {

    return this.cs.selectEntityObj<Goal, T>('goal', id, correlationId, childrenFn);
  }

  /** Select goals from the store. */
  public selectGoals = <T extends Goal>(
    queryParams: [string, string, any][],
    correlationId: string,
    childrenFn?: (e: Goal) => { [index: string]: Observable<any> },
  ): Observable<Array<T>> => {

    return this.cs.selectEntityList<Goal, T>('goal', queryParams, correlationId, childrenFn);
  }

  /** Get a goal directly from the database. */
  public getGoal = <T extends Goal>(
    id: string,
    childrenFn?: (e: Goal) => { [index: string]: Observable<any> },
  ): Observable<T> => {

    return this.db.queryObjOnce<Goal, T>('goals', id, childrenFn);
  }

  /** Get goals directly from the database. */
  public getGoals = <T extends Goal>(
    queryParams: [string, string, any][],
    queryOptions?: { [index: string]: any },
    childrenFn?: (e: Goal) => { [index: string]: Observable<any> },
  ): Observable<Array<T>> => {

    return this.db.queryListOnce<Goal, T>('goals', queryParams, queryOptions, childrenFn);
  }
}
