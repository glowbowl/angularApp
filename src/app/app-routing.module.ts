import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainComponent } from './main/main.component';
import { InfoComponent } from './info/info.component';
import { CreateComponent } from './create/create.component';

const routes: Routes = [
  { path: '', component: MainComponent},
  { path: 'info', component: InfoComponent },
  { path: 'create', component:CreateComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
