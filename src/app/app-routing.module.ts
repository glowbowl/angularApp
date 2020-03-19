import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MainComponent } from './main/main.component';
import { InfoComponent } from './info/info.component';
import { CreateComponent } from './create/create.component';
import { LoginComponent } from './login/login.component';

import { AuthGuard } from "./shared/guard/auth.guard";

const routes: Routes = [
  { path: '', component: MainComponent},
  { path: 'info', component: InfoComponent, canActivate: [AuthGuard] },
  { path: 'create', component: CreateComponent},
  { path: 'login', component: LoginComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
