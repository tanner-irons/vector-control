import { Injectable } from '@angular/core';
import { IEvent } from './schedule.model';
import { CronJob } from 'cron';
import { HttpClient } from '@angular/common/http';
import { CronService } from 'src/app/cron/cron.service';
import * as moment from 'moment';
import { IProcess } from '../process/process.model';
import { ProcessesModule } from '../processes.module';
const { ipcRenderer } = (<any>window).require('electron');

@Injectable()
export class ScheduleService implements IProcess {

  public name: string = 'Schedule Notifications';

  private events: IEvent[] = [];
  private refreshEventsJob: CronJob;
  private checkEventsJob: CronJob;

  constructor(
    private http: HttpClient,
    private cronService: CronService
  ) { }

  public initProcess(): void {
    this.refreshEvents();
    this.refreshEventsJob = this.cronService.registerJob('refreshEvents', '* * * * *', () => this.refreshEvents());
    this.checkEventsJob = this.cronService.registerJob('checkEvents', ' * * * * *', () => this.checkEvents());
  }

  public destroyProcess(): void {
    this.refreshEventsJob.stop();
    this.checkEventsJob.stop();
  }

  private shouldRemind(event: IEvent, time: moment.Moment): boolean {
    const start = moment(event.Start.DateTime).format('HH:mm');
    const reminder = time.add(event.ReminderMinutesBeforeStart, 'minutes').format('HH:mm');
    return event.IsReminderOn && reminder === start;
  }

  private checkEvents(): void {
    const now = moment()
    const time = now.format('HH:mm');
    if (this.events.length > 0) {
      this.events.forEach(event => {
        const start = moment(event.Start.DateTime).format('HH:mm');
        if (time === start) {
          ipcRenderer.send('script', start);
          console.log('The meeting starts now');
        }
        else if (this.shouldRemind(event, now)) {
          ipcRenderer.send('script', start);
          console.log('This is a reminder.');
        }
      });
    }
  }

  private refreshEvents(): void {
    const token = localStorage.getItem('token');
    if (token) {
      const start = moment().toISOString(true);
      const end = moment(start).add(30, 'minutes').toISOString(true);
      this.http.get<{ value: IEvent[] }>(`https://outlook.office.com/api/v2.0/me/calendarview?startDateTime=${start}&endDateTime=${end}`, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + token,
          'Prefer': 'outlook.timezone="Central Standard Time"'
        }
      })
        .subscribe(events => {
          this.events = events.value;
          console.log(this.events);
        });
    }
  }
}
