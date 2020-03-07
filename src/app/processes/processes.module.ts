import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ScheduleService } from './schedule/schedule.service';
import { MatCardModule } from '@angular/material/card';
import { ProcessBlockComponent } from './process-block/process-block.component';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';

@NgModule({
  declarations: [
    ProcessBlockComponent
  ],
  imports: [
    CommonModule,
    MatCardModule,
    MatSlideToggleModule
  ],
  exports: [
    ProcessBlockComponent
  ],
  providers: [
    ScheduleService
  ]
})
export class ProcessesModule { }
