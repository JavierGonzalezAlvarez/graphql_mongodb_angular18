import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { InstalationComponent } from './components/scheduler/instalation/instalation.component';

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'instalations', component: InstalationComponent},  
  {path: '**', redirectTo: ''}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
