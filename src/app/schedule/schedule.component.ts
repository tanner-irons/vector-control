import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.scss']
})
export class ScheduleComponent implements OnInit {

  constructor(
    private http: HttpClient
  ) { }

  ngOnInit() {
    const token = localStorage.getItem('token');
    this.http.get("https://outlook.office.com/api/v2.0/Users('a529241e-669c-4545-82b5-8b0f0b58b182@da8f04f2-fdac-45a9-9bd2-d709b4fde044')/Calendars('AQMkAGJhYjBkZjRmLTYyNzItNDhkNS1iZDhjLWE2MGRjOTdmMmVjMgBGAAADDd87d1GyOkCNppF6dFgiHAcAZUY3J-SUakmsE8XWfBnfCgAAAgEGAAAAZUY3J-SUakmsE8XWfBnfCgAAAglmAAAA')/calendarview?startDateTime=2020-01-20T00:00:00&endDateTime=2020-01-20T23:59:00",
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + token
        }
      }
    )
      .subscribe(calendars => {
        console.log(calendars);
      });
  }

}
