import {
  Component,
  ChangeDetectionStrategy,
  ViewChild,
  TemplateRef,
  Inject,
  OnInit
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
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MAT_DIALOG_DATA } from '@angular/material';
import { EventServiceService } from '../event-service.service';

//import { DialogBoxComponent } from '../dialog-box/dialog-box.component';


export interface DialogData {
  animal: string;
  name: string;
  eventTitle: string;
  startDate: string;
  endDate: string;
}

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
  },
  gray: {
    primary: 'gray',
    secondary: 'gray'
  }
};


@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent {
    
  ngOnInit() {this.sendEvent();} //this.getEvent();     

  @ViewChild('modalContent')
  modalContent: TemplateRef<any>;

  view: CalendarView = CalendarView.Month;

  CalendarView = CalendarView;

  viewDate: Date = new Date();

  modalData: {
    action: string;
    event: CalendarEvent;
  };

  eventTitle: string;
  startDate: string;
  endDate: string;
  personID: string;
  requestType: string;

  day: number;
  dayString: string;
  endDayString: string;

  eventChange: boolean = false;
  changedEvent: CalendarEvent;

  actions: CalendarEventAction[] = [
    {
      /* Editing an event by clicking on the edit button */
      label: '<i class="fa fa-fw fa-pencil"></i>',
      onClick: ({ event }: { event: CalendarEvent }): void => {
        this.changedEvent = event;

        this.day = event.start.getDate();
        if(this.day < 10) {
          this.dayString = "0" + this.day.toString();
        }
        else {
          this.dayString = this.day.toString();
        }
        this.day = event.end.getDate();
        if(this.day < 10) {
          this.endDayString = "0" + this.day.toString();
        }
        else {
          this.endDayString = this.day.toString();
        }        

        this.startDate = event.start.getFullYear().toString() + "-" + (event.start.getMonth()+1).toString() + "-" + this.dayString + "T" + event.start.getHours().toString() + ":00";// + event.start.getUTCMinutes().toString();
        this.endDate = event.end.getFullYear().toString() + "-" + (event.end.getMonth()+1).toString() + "-" + this.endDayString + "T" + event.end.getHours().toString() + ":00";// + event.end.getUTCMinutes().toString();
        console.log(this.startDate);
        console.log(this.endDate);
        this.eventTitle = event.title;
        this.eventChange = true;
        this.openDialog();
        

       // this.handleEvent('Edited', event);
      }
    },
    {
      /* Deleting an event by clicking on the delete button in the dropdown */
      label: '<i class="fa fa-fw fa-times"></i>',
      onClick: ({ event }: { event: CalendarEvent }): void => {
        this.events = this.events.filter(iEvent => iEvent !== event);
        //this.handleEvent('Deleted', event);
      }
    }
  ];

  refresh: Subject<any> = new Subject();

  events: CalendarEvent[] = [
    {
      start: addHours(new Date(), 2),
      end: addHours(new Date(), 4),
      title: 'Your Shift',
      color: colors.red,
      actions: this.actions,
      allDay: false,
      id: "person1",
      resizable: {
        beforeStart: true,
        afterEnd: true
      },
      draggable: true
    },
    {
      start: addHours(addDays(new Date(),1), 2),
      end: addHours(addDays(new Date(),1), 4),
      title: 'Coworker\'s shift',
      id: "person2",
      color: colors.blue,
      allDay: false
    },
    {
      start: addHours(addDays(new Date(),2), 2),
      end: addHours(addDays(new Date(),2), 4),
      title: 'Open shift',
      color: colors.yellow,
      id: "person1",
      actions: this.actions,
      resizable: {
        beforeStart: true,
        afterEnd: true
      },
      draggable: true
    }
  ];

  activeDayIsOpen: boolean = true;

  viewDateSelected: Date = new Date();

  constructor(private modal: NgbModal,public dialog: MatDialog, public dialogs: MatDialog, public EventService: EventServiceService) {}

//  getEvent():void {
//    this.events = this.EventService.get();
//}

  dayClicked({ date, events }: { date: Date; events: CalendarEvent[] }): void {
    if (isSameMonth(date, this.viewDate)) {
      this.viewDate = date;
      if (
        (isSameDay(this.viewDate, date) && this.activeDayIsOpen === true) ||// if same day selected and open, close it||
        events.length === 0
      ) {
        this.activeDayIsOpen = false;
        this.viewDateSelected = new Date();
      } else {
        this.activeDayIsOpen = true; 
        this.viewDateSelected = date;// open day
      }
    }
  }

  eventTimesChanged({
    event,
    newStart,
    newEnd
  }: CalendarEventTimesChangedEvent): void {
    event.start = newStart;
    event.end = newEnd;
    //this.handleEvent('Dropped or resized', event);
    this.refresh.next();
  }

  handleEvent(action: string, event: CalendarEvent): void {
    this.modalData = { event, action };
    this.modal.open(this.modalContent, { size: 'lg' });
  }

  testDate:Date = new Date();

  newStartDate:Date;

  newEndDate:Date;

  isMultiDateEvent: boolean;

  addEvent(): void {    

    if(this.startDate.slice(0,10) === this.endDate.slice(0,10))
      this.isMultiDateEvent = false;
    else
      this.isMultiDateEvent = true;

      this.newStartDate = new Date(Date.parse(this.startDate));
      this.newEndDate = new Date(Date.parse(this.endDate));

      console.log(this.newStartDate);
      console.log(this.newEndDate);

      if(!this.eventChange) {
        this.events.push({
          title: this.eventTitle,
          start: addHours(this.newStartDate, 6),
          end: addHours(this.newEndDate,6),
          color: colors.gray,
          id: this.personID,
          draggable: true,
          allDay: this.isMultiDateEvent,
          actions: this.actions,
          resizable: {
            beforeStart: true,
            afterEnd: true
          }
        });
        this.refresh.next();
      }
      else {
        this.changedEvent.title = this.eventTitle,
        this.changedEvent.start = addHours(this.newStartDate, 6),
        this.changedEvent.end = addHours(this.newEndDate,6),
        this.changedEvent.allDay = this.isMultiDateEvent,
        this.refresh.next();
        this.eventChange = false;
        this.startDate = "";
        this.endDate = "";
        this.eventTitle = "";
      }
      this.sendEvent();
    
  }

sendEvent():void {
        this.EventService.add(this.events);
    }

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogOverviewExampleDialog, {
      width: '250px',
      data: {startDate: this.startDate,endDate: this.endDate, eventTitle: this.eventTitle, requestType: this.requestType}
    });


    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.eventTitle = result[0];
      this.startDate = result[1];
      this.endDate = result[2];
      this.requestType = result[3];
      console.log(result);
      
      if(result && result[3] == "work")
        this.addEvent();
    });
  }
  
  requestDialog(): void {
    const dialogRef = this.dialog.open(DialogOverviewExampleDialog, {
      width: '275px',
      data: {startDate: this.startDate,endDate: this.endDate, eventTitle: this.eventTitle}
    });
  }
  
  availabilityDialog(): void {
    this.dialogs.open(Availability, {
      
      data: {startDate: this.startDate}
    });

  }

}

@Component({
  selector: 'dialog-overview-example-dialog',
  templateUrl: './dialog-box.component.html',
  styleUrls: ['./calendar.component.css']
})
export class DialogOverviewExampleDialog {

  constructor(
    public dialogRef: MatDialogRef<DialogOverviewExampleDialog>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

}

@Component({
  templateUrl: './availability.html',
  styleUrls: ['./calendar.component.css']
})
export class Availability {

  constructor(
    public dialogRef: MatDialogRef<Availability>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {}

    onNoClick(): void {
    this.dialogRef.close();
  }
}