import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EffectsModule } from '@ngrx/effects';
import { SharedModule } from '../shared/shared.module';
import { MainRoutingModule } from './main-routing.module';

// Containers
import { ReorientComponent } from './reorient/reorient.component';
import { ReorientEventsEffects } from './reorient/+events/reorient.events.effects';
import { ReorientStateEffects } from './reorient/+state/reorient.state.effects';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DashboardEventsEffects } from './dashboard/+events/dashboard.events.effects';
import { DashboardStateEffects } from './dashboard/+state/dashboard.state.effects';

// Components
import { PrePostTestComponent } from './dashboard/pre-post-test/pre-post-test.component';
import { WeekGoalsSlideComponent } from './reorient/slides/week-goals-slide/week-goals-slide.component';
import { ReviewGoalsSlideComponent } from './reorient/slides/review-goals-slide/review-goals-slide.component';
import { CalendarScheduleSlideComponent } from './reorient/slides/calendar-schedule-slide/calendar-schedule-slide.component';
import { CalendarInfoSlideComponent } from './reorient/slides/calendar-info-slide/calendar-info-slide.component';
import { WeekHashtagSlideComponent } from './reorient/slides/week-hashtag-slide/week-hashtag-slide.component';
import { TextSlideComponent } from './reorient/slides/text-slide/text-slide.component';
import { LongTermGoalsSlideComponent } from './reorient/slides/long-term-goals-slide/long-term-goals-slide.component';
import { QuarterGoalsSlideComponent } from './reorient/slides/quarter-goals-slide/quarter-goals-slide.component';
import { ProgressBarComponent } from './reorient/progress-bar/progress-bar.component';

/** Contains the main dashboard and setup views. */
@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    MainRoutingModule,
    EffectsModule.forFeature([
      ReorientStateEffects,
      ReorientEventsEffects,
      DashboardStateEffects,
      DashboardEventsEffects,
    ])
  ],
  declarations: [
    // Containers
    ReorientComponent,
    DashboardComponent,
    // Components
    PrePostTestComponent,
    WeekGoalsSlideComponent,
    ReviewGoalsSlideComponent,
    CalendarScheduleSlideComponent,
    CalendarInfoSlideComponent,
    WeekHashtagSlideComponent,
    TextSlideComponent,
    LongTermGoalsSlideComponent,
    QuarterGoalsSlideComponent,
    ProgressBarComponent,
  ],
})
export class MainModule { }
