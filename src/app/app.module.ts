import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RunComponent } from './run/run.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule } from '@angular/material/toolbar';
import { ProcessesModule } from './processes/processes.module';

@NgModule({
  declarations: [
    AppComponent,
    RunComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NoopAnimationsModule,
    MatToolbarModule,
    ProcessesModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
