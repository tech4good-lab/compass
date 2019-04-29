import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CachedSelectorsService } from '../cached-selectors.service';
import { WeekGoal } from './week-goal.model';

@Injectable({
  providedIn: 'root'
})
export class WeekGoalSelectorsService {

  constructor(private cs: CachedSelectorsService) { }

  public selectWeekGoal = <T extends WeekGoal>(
    id: string,
    correlationId: string,
    childrenFn?: (e: WeekGoal) => { [index: string]: Observable<any> }
  ): Observable<T> => {

    return this.cs.selectEntityObj<WeekGoal, T>('weekGoal', id, correlationId, childrenFn);
  }
 
  public selectWeekGoals = <T extends WeekGoal>(
    queryParams: [string, string, any][],
    correlationId: string,
    childrenFn?: (e: WeekGoal) => { [index: string]: Observable<any> }
  ): Observable<Array<T>> => {

    return this.cs.selectEntityList<WeekGoal, T>('weekGoal', queryParams, correlationId, childrenFn);
  }
}