import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CronService } from '../cron.service';
import { CronJob } from 'cron';
import * as moment from 'moment';
const { ipcRenderer } = (<any>window).require('electron');

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.scss']
})
export class ScheduleComponent implements OnInit {

  private events: any[] = [];
  private refreshEventsJob: CronJob;
  private checkEventsJob: CronJob;
  constructor(
    private http: HttpClient,
    private cronService: CronService
  ) { }

  ngOnInit() {
    this.refreshEvents();
    this.refreshEventsJob = this.cronService.registerJob('refreshEvents', '*/15 * * * *', () => {
      this.refreshEvents();
    });

    this.checkEventsJob = this.cronService.registerJob('checkEvents', ' * * * * *', () => {
      const time = moment().format('HH:mm');
      if (this.events.length > 0) {
        this.events.forEach(event => {
          const start = moment(event.Start.DateTime).format('HH:mm');
          if (time === start) {
            ipcRenderer.send('script', start);
            console.log('The meeting starts now');
          }
        });
      }
    });
  }

  private refreshEvents() {
    const token = localStorage.getItem('token');
    if (token) {
      const start = moment().toISOString(true);
      const end = moment(start).add(30, 'minutes').toISOString(true);
      this.http.get<any>(`https://outlook.office.com/api/v2.0/me/calendarview?startDateTime=${start}&endDateTime=${end}`,
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token,
            'Prefer': 'outlook.timezone="Central Standard Time"'
          }
        }
      )
        .subscribe(calendars => {
          this.events = calendars.value;
        });
    }
  }

}
