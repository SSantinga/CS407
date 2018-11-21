import {
  Component,
  ChangeDetectionStrategy,
  ViewChild,
  TemplateRef,
  Inject
} from '@angular/core';
import {
  startOfDay,
  endOfDay,
  subDays,
  addDays,
  endOfMonth,
  isSameDay,
  isSameMonth,
  addHours
} from 'date-fns';
import { Subject } from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {
  CalendarEvent,
  CalendarEventAction,
  CalendarEventTimesChangedEvent,
  CalendarView
} from 'angular-calendar';
//import { CalendarComponent } from 'C:/Users/Sawri/Desktop/Software Interface Design/Project/CS407/myShift/src/app/calendar/calendar.component';
import { DatePipe } from '@angular/common';
import { EventServiceService } from '../event-service.service';

const colors: any = {
  red: {
    primary: '#ad2121',
    secondary: '#FAE3E3'
  },
  blue: {
    primary: '#1e90ff',
    secondary: '#D1E8FF'
  },
  yellow: {
    primary: '#e3bc08',
    secondary: '#FDF1BA'
  }
};


@Component({
  selector: 'app-left-menu',
  templateUrl: './left-menu.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['./left-menu.component.css']
})
export class LeftMenuComponent{
  
  constructor(public EventService: EventServiceService) { }

  ngOnInit() {}
  
  messages: string[];
  
  events: CalendarEvent[] = [];
  
getEvent():void {
    this.events = this.EventService.get();
    console.log(this.events[0].start.toString());
    //this.messages = this.events;
}
  
  /*
@ViewChild('modalContent')
  modalContent: TemplateRef<any>;

  modalData: {
    action: string;
    event: CalendarEvent;
  };

  eventTitle: string;
  startDate: string;
  endDate: string;

  day: number;
  dayString: string;
  endDayString: string;

  eventChange: boolean = false;
  changedEvent: CalendarEvent;

  refresh: Subject<any> = new Subject();

  events: CalendarEvent[] = [
    {
      start: subDays(startOfDay(new Date()), 1),
      end: addDays(new Date(), 1),
      title: 'A 3 day event',
    },
    {
      start: subDays(endOfMonth(new Date()), 3),
      end: addDays(endOfMonth(new Date()), 3),
      title: 'A long event that spans 2 months',
    },
    {
      start: addHours(startOfDay(new Date()), 2),
      end: new Date(),
      title: 'A draggable and resizable event',
    }
  ];
*/

}