import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CoworkersComponent } from './coworkers/coworkers.component';

export const routes: Routes = [{
  path: 'app-coworkers',
  component: CoworkersComponent,
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
