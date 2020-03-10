import { Injectable } from '@angular/core';
import { CronJob } from 'cron';

@Injectable({
  providedIn: 'root'
})
export class CronService {

  private jobs: Map<string, CronJob> = new Map<string, CronJob>();
  
  constructor() { }

  public registerJob(name: string, pattern: string, callback: () => void): CronJob {
    const job = new CronJob(pattern, callback, null, true, 'America/Chicago', null, false);
    this.jobs.set(name, job);

    return job;
  }

  public getJob(name: string): CronJob {
    return this.jobs.get(name);
  }

  ngOnDestroy(): void {
    Array.from(this.jobs.values()).forEach(job => job.stop());
  }

}
