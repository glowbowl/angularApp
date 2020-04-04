import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { HttpClientModule } from '@angular/common/http';

import { FormsModule, ReactiveFormsModule, } from '@angular/forms';

import { AngularFireModule } from "@angular/fire";
import { AngularFireAuthModule } from "@angular/fire/auth";
import { AngularFirestoreModule } from "@angular/fire/firestore";
import { environment } from "../environments/environment";

import { MatButtonModule } from "@angular/material/button";
import { MatDialogModule } from "@angular/material/dialog";
import {MatFormFieldModule} from "@angular/material/form-field";

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { MainComponent } from './main/main.component';
import { InfoComponent } from './info/info.component';
import { CreateComponent } from './create/create.component';
import { LoginComponent } from './login/login.component';

import { AuthService } from "./shared/services/auth.service";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DeleteDialogComponent } from './info/delete-dialog/delete-dialog.component';
import { UpdateDialogComponent } from './info/update-dialog/update-dialog.component';
import { UpdateAdditionalComponent } from './info/update-additional/update-additional.component';

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    InfoComponent,
    CreateComponent,
    LoginComponent,
    DeleteDialogComponent,
    UpdateDialogComponent,
    UpdateAdditionalComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AngularFireAuthModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatDialogModule,
    MatFormFieldModule
  ],
  entryComponents: [
    DeleteDialogComponent,
    UpdateDialogComponent,
    UpdateAdditionalComponent
  ],
  providers: [AuthService],
  bootstrap: [AppComponent]
})
export class AppModule {}
