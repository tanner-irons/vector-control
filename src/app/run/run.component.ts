import { Component, OnInit } from '@angular/core';
import { IProcess } from '../processes/process-block/process-block.model';
import { ScheduleService } from '../processes/schedule/schedule.service';
import { ZombieService } from '../processes/zombie/zombie.service';

@Component({
  selector: 'app-run',
  templateUrl: './run.component.html',
  styleUrls: ['./run.component.scss']
})
export class RunComponent implements OnInit {

  public loaded = false;
  public processes: IProcess[] = [];

  constructor(
    private scheduleService: ScheduleService,
    private zombieService: ZombieService
  ) { }

  ngOnInit(): void {
    this.processes = [
      this.scheduleService,
      this.zombieService
    ];
  }

  ngDoCheck(): void {
    if (!this.loaded) {
      const token = localStorage.getItem('token');
      if (token) {
        this.loaded = true;
      }
    }
  }
}
