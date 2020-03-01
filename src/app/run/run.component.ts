import { Component, OnInit, Compiler } from '@angular/core';
import { IProcess } from '../processes/process/process.model';
import { ProcessesModule } from '../processes/processes.module';
import { HttpClient } from '@angular/common/http';
import { CronService } from '../cron/cron.service';

@Component({
  selector: 'app-run',
  templateUrl: './run.component.html',
  styleUrls: ['./run.component.scss']
})
export class RunComponent implements OnInit {

  public loaded = false;
  public processes: IProcess[] = [];

  constructor(
    private compiler: Compiler,
    private http: HttpClient,
    private cron: CronService
  ) { }

  ngOnInit(): void {
    this.compiler.compileModuleAsync(ProcessesModule).then(compiled => {
      (compiled as any).moduleType.ngInjectorDef.providers.forEach(process => {
        this.registerProcess(new process(this.http, this.cron));
      });
    });
  }

  ngDoCheck(): void {
    if (!this.loaded) {
      const token = localStorage.getItem('token');
      if (token) {
        this.loaded = true;
      }
    }
  }

  private registerProcess(process: IProcess) {
    this.processes.push(process);
  }
}
