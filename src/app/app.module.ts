import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { HttpClientModule } from '@angular/common/http';

import { FormsModule, ReactiveFormsModule, } from '@angular/forms';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AngularFireModule } from "@angular/fire";
import { AngularFireAuthModule } from "@angular/fire/auth";
import { AngularFirestoreModule } from "@angular/fire/firestore";
import { environment } from "../environments/environment";

import { NgxsModule } from "@ngxs/store";
import { NgxsLoggerPluginModule } from "@ngxs/logger-plugin";
import { NgxsReduxDevtoolsPluginModule } from "@ngxs/devtools-plugin";

import { MatProgressSpinnerModule } from "@angular/material/progress-spinner"
import { MatInputModule } from "@angular/material/input";
import { MatSelectModule } from "@angular/material/select";
import { MatButtonModule } from "@angular/material/button";
import { MatDialogModule } from "@angular/material/dialog";
import { MatFormFieldModule } from "@angular/material/form-field";

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { MainComponent } from './main/main.component';
import { InfoComponent } from './info/info.component';
import { CreateComponent } from './create/create.component';
import { LoginComponent } from './login/login.component';
import { DeleteDialogComponent } from './info/delete-dialog/delete-dialog.component';
import { UpdateDialogComponent } from './info/update-dialog/update-dialog.component';
import { UpdateAdditionalComponent } from './info/update-additional/update-additional.component';

import { LoadingComponent } from './shared/loading/loading.component';
import { CountryService } from "./shared/services/country.service";
import { AuthService } from "./shared/services/auth.service";

import { CountriesState } from "./store/state/countries.state";
import { LoginUserState } from "./store/state/loginUser.state";
import { UserState } from "./store/state/user.state";


@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    InfoComponent,
    CreateComponent,
    LoginComponent,
    DeleteDialogComponent,
    UpdateDialogComponent,
    UpdateAdditionalComponent,
    LoadingComponent
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
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatProgressSpinnerModule,
    NgxsModule.forRoot([
      LoginUserState,
      //UserState,
      CountriesState,
    ], { developmentMode: !environment.production }),
    NgxsLoggerPluginModule.forRoot(),
    NgxsReduxDevtoolsPluginModule.forRoot(),
  ],
  entryComponents: [
    DeleteDialogComponent,
    UpdateDialogComponent,
    UpdateAdditionalComponent
  ],
  providers: [AuthService, CountryService],
  bootstrap: [AppComponent]
})
export class AppModule { }
