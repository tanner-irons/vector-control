import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-run',
  templateUrl: './run.component.html',
  styleUrls: ['./run.component.scss']
})
export class RunComponent implements OnInit {

  public loaded = false;

  ngOnInit(): void {

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
