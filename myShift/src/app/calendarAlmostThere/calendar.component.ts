import {Component, ViewChild, AfterViewInit} from "@angular/core";
import {DayPilotMonthComponent} from "daypilot-pro-angular";
import {DataService} from "./DataService";{}

@Component({
  selector: 'app-calendar',
  template: `<daypilot-month [config]="config"></daypilot-month>`,
  styles: [``]
})
export class CalendarComponent implements AfterViewInit {

  @ViewChild("month")
  month: DayPilotMonthComponent;

  events: any[] = [];

  config: any = {
    startDate: "2017-12-01",
  };

  constructor(private ds: DataService) {
  }

  ngAfterViewInit(): void {
    var from = this.month.control.visibleStart();
    var to = this.month.control.visibleEnd();
    this.ds.getEvents(from, to).subscribe(result => {
      this.events = result;
    });
  }

}