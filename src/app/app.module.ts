import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';


import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {GameComponent} from './game/game.component';
import {LoginComponent} from './login/login.component';
import {RegisterComponent} from './register/register.component';
import {UserComponent} from './user/user.component';
import {HomeComponent} from './home/home.component';
import {ConfirmationComponent} from './confirmation/confirmation.component';
import {ChangePasswordComponent} from './change-password/change-password.component';
import {HttpClientModule} from '@angular/common/http';

import {MatButtonModule, MatInputModule} from '@angular/material';
import {StorageServiceModule} from 'angular-webstorage-service';
import {UtilsService} from "./utils/utils.service";

@NgModule({
    declarations: [
        AppComponent,
        GameComponent,
        LoginComponent,
        RegisterComponent,
        UserComponent,
        HomeComponent,
        ConfirmationComponent,
        ChangePasswordComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        FormsModule,
        MatButtonModule,
        MatInputModule,
        HttpClientModule,
        StorageServiceModule
    ],
    providers: [UtilsService],
    bootstrap: [AppComponent]
})
export class AppModule {
}
