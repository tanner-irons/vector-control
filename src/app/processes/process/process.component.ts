import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { IProcess } from './process.model';

@Component({
  selector: 'app-process',
  templateUrl: './process.component.html',
  styleUrls: ['./process.component.scss']
})
export class ProcessComponent implements OnInit, OnDestroy {

  @Input() process: IProcess;

  constructor() { }

  public ngOnInit(): void {
    this.process.initProcess();
  }

  public ngOnDestroy(): void {
    this.process.destroyProcess();
  }

}
