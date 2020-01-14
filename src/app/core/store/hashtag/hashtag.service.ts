import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CachedSelectorsService } from '../cached-selectors.service';
import { FirebaseService } from '../../firebase/firebase.service';
import { Hashtag } from './hashtag.model';

@Injectable({
  providedIn: 'root',
})
export class HashtagService {

  constructor(
    private cs: CachedSelectorsService,
    private db: FirebaseService,
  ) { }

  /** Select a hashtag from the store. */
  public selectHashtag = <T extends Hashtag>(
    id: string,
    correlationId: string,
    childrenFn?: (e: Hashtag) => { [index: string]: Observable<any> },
  ): Observable<T> => {

    return this.cs.selectEntityObj<Hashtag, T>('hashtag', id, correlationId, childrenFn);
  }

  /** Select hashtags from the store. */
  public selectHashtags = <T extends Hashtag>(
    queryParams: [string, string, any][],
    correlationId: string,
    childrenFn?: (e: Hashtag) => { [index: string]: Observable<any> },
  ): Observable<Array<T>> => {

    return this.cs.selectEntityList<Hashtag, T>('hashtag', queryParams, correlationId, childrenFn);
  }

  /** Get a hashtag directly from the database. */
  public getHashtag = <T extends Hashtag>(
    id: string,
    childrenFn?: (e: Hashtag) => { [index: string]: Observable<any> },
  ): Observable<T> => {

    return this.db.queryObjOnce<Hashtag, T>('hashtags', id, childrenFn);
  }

  /** Get hashtags directly from the database. */
  public getHashtags = <T extends Hashtag>(
    queryParams: [string, string, any][],
    queryOptions?: { [index: string]: any },
    childrenFn?: (e: Hashtag) => { [index: string]: Observable<any> },
  ): Observable<Array<T>> => {

    return this.db.queryListOnce<Hashtag, T>('hashtags', queryParams, queryOptions, childrenFn);
  }
}
