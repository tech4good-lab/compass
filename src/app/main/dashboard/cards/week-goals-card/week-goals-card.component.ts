import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Input,
  Output,
  EventEmitter
} from "@angular/core";
import { WeekGoal } from "../../../../core/store/week-goal/week-goal.model";
import { LoadWeekGoal } from "../../../../core/store/week-goal/week-goal.actions";

/** Displays the weekly goals. */
@Component({
  selector: "app-week-goals-card",
  templateUrl: "./week-goals-card.component.html",
  styleUrls: ["./week-goals-card.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class WeekGoalsCardComponent implements OnInit {
  list: string;

  // --------------- INPUTS AND OUTPUTS ------------------

  /** The start of the week. */
  @Input() startOfWeek: Date;

  /** Goals for a week. */
  @Input() goals: WeekGoal[];

  /** Edit weekly goals events. */
  @Output() editGoals: EventEmitter<WeekGoal[]> = new EventEmitter<
    WeekGoal[]
  >();

  // --------------- LOCAL UI STATE ----------------------

  constructor() {}

  ngOnInit() {
    console.log(this.goals);
  }

  formattedDate() {
    return (
      this.startOfWeek.getMonth() +
      "/" +
      this.startOfWeek.getDate() +
      " - " +
      this.startOfWeek.getMonth() +
      "/" +
      (this.startOfWeek.getDate() + 6)
    );
  }

  // --------------- DATA BINDING FUNCTIONS --------------

  // --------------- EVENT BINDING FUNCTIONS -------------

  // --------------- OTHER -------------------------------
}
