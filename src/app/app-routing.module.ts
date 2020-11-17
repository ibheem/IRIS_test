import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RecordsComponent } from './records/records.component';

const routes: Routes = [{path:'**', component: RecordsComponent}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
