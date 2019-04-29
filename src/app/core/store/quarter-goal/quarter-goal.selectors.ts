import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CachedSelectorsService } from '../cached-selectors.service';
import { QuarterGoal } from './quarter-goal.model';

@Injectable({
  providedIn: 'root'
})
export class QuarterGoalSelectorsService {

  constructor(private cs: CachedSelectorsService) { }

  public selectQuarterGoal = <T extends QuarterGoal>(
    id: string,
    correlationId: string,
    childrenFn?: (e: QuarterGoal) => { [index: string]: Observable<any> }
  ): Observable<T> => {

    return this.cs.selectEntityObj<QuarterGoal, T>('quarterGoal', id, correlationId, childrenFn);
  }
 
  public selectQuarterGoals = <T extends QuarterGoal>(
    queryParams: [string, string, any][],
    correlationId: string,
    childrenFn?: (e: QuarterGoal) => { [index: string]: Observable<any> }
  ): Observable<Array<T>> => {

    return this.cs.selectEntityList<QuarterGoal, T>('quarterGoal', queryParams, correlationId, childrenFn);
  }
}