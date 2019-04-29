import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CachedSelectorsService } from '../cached-selectors.service';
import { CalendarEvent } from './calendar-event.model';

@Injectable({
  providedIn: 'root'
})
export class CalendarEventSelectorsService {

  constructor(private cs: CachedSelectorsService) { }

  public selectCalendarEvent = <T extends CalendarEvent>(
    id: string,
    correlationId: string,
    childrenFn?: (e: CalendarEvent) => { [index: string]: Observable<any> }
  ): Observable<T> => {

    return this.cs.selectEntityObj<CalendarEvent, T>('calendarEvent', id, correlationId, childrenFn);
  }
 
  public selectCalendarEvents = <T extends CalendarEvent>(
    queryParams: [string, string, any][],
    correlationId: string,
    childrenFn?: (e: CalendarEvent) => { [index: string]: Observable<any> }
  ): Observable<Array<T>> => {

    return this.cs.selectEntityList<CalendarEvent, T>('calendarEvent', queryParams, correlationId, childrenFn);
  }
}