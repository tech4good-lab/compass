import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CachedSelectorsService } from '../cached-selectors.service';
import { User } from './user.model';

@Injectable({
  providedIn: 'root'
})
export class UserSelectorsService {

  constructor(private cs: CachedSelectorsService) { }

  public selectUser = <T extends User>(
    id: string,
    correlationId: string,
    childrenFn?: (e: User) => { [index: string]: Observable<any> }
  ): Observable<T> => {

    return this.cs.selectEntityObj<User, T>('user', id, correlationId, childrenFn);
  }
 
  public selectUsers = <T extends User>(
    queryParams: [string, string, any][],
    correlationId: string,
    childrenFn?: (e: User) => { [index: string]: Observable<any> }
  ): Observable<Array<T>> => {

    return this.cs.selectEntityList<User, T>('user', queryParams, correlationId, childrenFn);
  }
}