import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RunComponent } from './run/run.component';


const routes: Routes = [
  { path: '', redirectTo: '/run', pathMatch: 'full' },
  { path: 'run', component: RunComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
