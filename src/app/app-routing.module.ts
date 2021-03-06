import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { MapsComponent } from './maps/maps.component';
import { ObservablesComponent } from './observables/observables.component';
import { SubjectsComponent } from './subjects/subjects.component';
const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'observables', component: ObservablesComponent },
  { path: 'subjects', component: SubjectsComponent },
  { path: 'maps', component: MapsComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
