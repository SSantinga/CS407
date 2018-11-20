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
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MAT_DIALOG_DATA } from '@angular/material';

//import { DialogBoxComponent } from '../dialog-box/dialog-box.component';


export interface DialogData {
  animal: string;
  name: string;
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
  }
};


@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent {

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

  eventChange: boolean = false;
  changedEvent: CalendarEvent;

  actions: CalendarEventAction[] = [
    {
      /* Editing an event by clicking on the edit button */
      label: '<i class="fa fa-fw fa-pencil"></i>',
      onClick: ({ event }: { event: CalendarEvent }): void => {
        this.changedEvent = event;
        console.log(event.start.getFullYear().toString() + "-" + (event.start.getMonth()+1).toString() + "-" + event.start.getDate().toString() + "T0" + event.start.getHours().toString() + ":00");// + event.start.getMinutes().toString());
        this.startDate = event.start.getFullYear().toString() + "-" + (event.start.getMonth()+1).toString() + "-" + event.start.getDate().toString() + "T0" + event.start.getHours().toString() + ":00";// + event.start.getUTCMinutes().toString();
        this.endDate = event.end.getFullYear().toString() + "-" + (event.end.getMonth()+1).toString() + "-" + event.end.getDate().toString() + "T" + event.end.getHours().toString() + ":00";// + event.end.getUTCMinutes().toString();
        console.log(this.startDate);
        console.log(this.endDate);
        this.eventTitle = event.title;
        this.eventChange = true;
        this.openDialog();
        this.startDate = "";
        this.endDate = "";
        this.eventTitle = "";

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
      start: subDays(startOfDay(new Date()), 1),
      end: addDays(new Date(), 1),
      title: 'A 3 day event',
      color: colors.red,
      actions: this.actions,
      allDay: true,
      resizable: {
        beforeStart: true,
        afterEnd: true
      },
      draggable: true
    },
    {
      start: startOfDay(new Date()),
      title: 'An event with no end date',
      color: colors.yellow,
      actions: this.actions
    },
    {
      start: subDays(endOfMonth(new Date()), 3),
      end: addDays(endOfMonth(new Date()), 3),
      title: 'A long event that spans 2 months',
      color: colors.blue,
      allDay: true
    },
    {
      start: addHours(startOfDay(new Date()), 2),
      end: new Date(),
      title: 'A draggable and resizable event',
      color: colors.yellow,
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

  constructor(private modal: NgbModal,public dialog: MatDialog) {} //,public dialog: MatDialog

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
          start: this.newStartDate,
          end: this.newEndDate,
          color: colors.red,
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
        this.changedEvent.start = this.newStartDate,
        this.changedEvent.end = this.newEndDate
        this.refresh.next();
        this.eventChange = false;
      }
  }



  openDialog(): void {
    const dialogRef = this.dialog.open(DialogOverviewExampleDialog, {
      width: '250px',
      data: {startDate: this.startDate,endDate: this.endDate, eventTitle: this.eventTitle}
    });


    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.eventTitle = result[0];
      this.startDate = result[1];
      this.endDate = result[2];
      console.log(result);
      
      if(result)
        this.addEvent();
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