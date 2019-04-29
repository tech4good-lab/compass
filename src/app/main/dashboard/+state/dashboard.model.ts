import { CalendarEvent } from '../../../core/store/calendar-event/calendar-event.model';
import { WeekGoal } from '../../../core/store/week-goal/week-goal.model';
import { QuarterGoal } from '../../../core/store/quarter-goal/quarter-goal.model';

export interface WeekGoalWithEvents extends WeekGoal {
  calendarEvents: CalendarEvent[];
}

export interface CalendarEventData extends CalendarEvent {
  // this is the only data needed from week goal (for determining color)
  weekGoalIndex: number;
}

export interface UpcomingEventsData {
  // all events that start today
  today: CalendarEventData[];
  // all events that start tomorrow
  tomorrow: CalendarEventData[];
}

export interface WeekGoalProgress extends WeekGoal {
  // Sum up the times blocked off towards this goal this week.
  totalAllocatedMins: number;
  // This is the blocked off time in the past.
  totalCompletedMins: number;
}
