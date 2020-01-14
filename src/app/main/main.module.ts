import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EffectsModule } from '@ngrx/effects';
import { SharedModule } from '../shared/shared.module';
import { MainRoutingModule } from './main-routing.module';

// Containers
import { OnboardingComponent } from './onboarding/onboarding.component';
import { OnboardingEffects } from './onboarding/+state/onboarding.effects';
import { ReorientComponent } from './reorient/reorient.component';
import { ReorientEventsEffects } from './reorient/+events/reorient.events.effects';
import { ReorientStateEffects } from './reorient/+state/reorient.state.effects';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DashboardEventsEffects } from './dashboard/+events/dashboard.events.effects';
import { DashboardStateEffects } from './dashboard/+state/dashboard.state.effects';

// Components
import { SetLongTermGoalsComponent } from './onboarding/set-long-term-goals/set-long-term-goals.component';
import { ProgressBarComponent } from './onboarding/progress-bar/progress-bar.component';
import { WeekGoalsSlideComponent } from './reorient/slides/week-goals-slide/week-goals-slide.component';
import { ReviewGoalsSlideComponent } from './reorient/slides/review-goals-slide/review-goals-slide.component';
import { CalendarScheduleSlideComponent } from './reorient/slides/calendar-schedule-slide/calendar-schedule-slide.component';
import { CalendarInfoSlideComponent } from './reorient/slides/calendar-info-slide/calendar-info-slide.component';
import { WeekHashtagSlideComponent } from './reorient/slides/week-hashtag-slide/week-hashtag-slide.component';
import { TextSlideComponent } from './reorient/slides/text-slide/text-slide.component';
import { LongTermGoalsSlideComponent } from './reorient/slides/long-term-goals-slide/long-term-goals-slide.component';
import { QuarterGoalsSlideComponent } from './reorient/slides/quarter-goals-slide/quarter-goals-slide.component';
import { ProgressBarComponent } from './reorient/progress-bar/progress-bar.component';
import { LongTermGoalsCardComponent } from './dashboard/cards/long-term-goals-card/long-term-goals-card.component';
import { ReflectionsCardComponent } from './dashboard/cards/reflections-card/reflections-card.component';
import { QuarterGoalsCardComponent } from './dashboard/cards/quarter-goals-card/quarter-goals-card.component';
import { WeekGoalsCardComponent } from './dashboard/cards/week-goals-card/week-goals-card.component';
import { NewQuarterComponent } from './dashboard/new-quarter/new-quarter.component';
import { WeekProgressCardComponent } from './dashboard/cards/week-progress-card/week-progress-card.component';
import { GreetingSearchComponent } from './dashboard/greeting-search/greeting-search.component';
import { UpcomingCardComponent } from './dashboard/cards/upcoming-card/upcoming-card.component';
import { NewWeekComponent } from './dashboard/new-week/new-week.component';
import { DateTimeComponent } from './dashboard/date-time/date-time.component';

/** Contains the main dashboard and setup views. */
@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    MainRoutingModule,
    EffectsModule.forFeature([
      OnboardingEffects,
      ReorientStateEffects,
      ReorientEventsEffects,
      DashboardStateEffects,
      DashboardEventsEffects,
    ])
  ],
  declarations: [
    // Containers
    OnboardingComponent,
    ReorientComponent,
    DashboardComponent,
    // Components
    SetLongTermGoalsComponent,
    ProgressBarComponent,
    WeekGoalsSlideComponent,
    ReviewGoalsSlideComponent,
    CalendarScheduleSlideComponent,
    CalendarInfoSlideComponent,
    WeekHashtagSlideComponent,
    TextSlideComponent,
    LongTermGoalsSlideComponent,
    QuarterGoalsSlideComponent,
    ProgressBarComponent,
    LongTermGoalsCardComponent,
    ReflectionsCardComponent,
    QuarterGoalsCardComponent,
    WeekGoalsCardComponent,
    NewQuarterComponent,
    WeekProgressCardComponent,
    GreetingSearchComponent,
    UpcomingCardComponent,
    NewWeekComponent,
    DateTimeComponent,
  ],
  entryComponents: [
  ]
})
export class MainModule { }
