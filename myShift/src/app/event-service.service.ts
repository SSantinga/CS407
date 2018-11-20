import { Injectable } from '@angular/core';
import {
  CalendarEvent,
  CalendarEventAction,
  CalendarEventTimesChangedEvent,
  CalendarView
} from 'angular-calendar';

@Injectable({
  providedIn: 'root'
})
export class EventServiceService {

  constructor() { }
  
  events: CalendarEvent[] = [];
  
  messages: string[] = [];

  get() {
 //   console.log(events[0].start.toString());
    return this.events; 
  }

  add(events: CalendarEvent[]) {
//    console.log(events[0].start.toString());
    this.events = events;
  }

  clear() {
    this.messages = [];
  }
}
