import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { IProcess } from './process-block.model';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';

@Component({
  selector: 'app-process-block',
  templateUrl: './process-block.component.html',
  styleUrls: ['./process-block.component.scss']
})
export class ProcessBlockComponent implements OnInit, OnDestroy {

  @Input() process: IProcess;

  constructor() { }

  public ngOnInit(): void {
    this.process.initProcess();
    this.process.isRunning && this.process.startProcess();
  }

  public ngOnDestroy(): void {
    this.process.stopProcess();
  }

  public toggleProcess($event: MatSlideToggleChange) {
    this.process.isRunning = $event.checked;
    if (this.process.isRunning) {
      this.process.startProcess();
    }
    else {
      this.process.stopProcess();
    }
  }

}
