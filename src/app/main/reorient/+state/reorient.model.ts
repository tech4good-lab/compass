import { CalendarEvent } from "../../../core/store/calendar-event/calendar-event.model";
import { WeekGoal } from "../../../core/store/week-goal/week-goal.model";

export interface WeekGoalWithEvents extends WeekGoal {
    calendarEvents: CalendarEvent[];
  }