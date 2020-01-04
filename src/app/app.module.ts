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
import {SocketIoConfig, SocketIoModule} from 'ngx-socket-io';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {StorageServiceModule} from 'angular-webstorage-service';
import {UtilsService} from './utils/utils.service';
import {MatFormFieldModule} from '@angular/material/form-field';

const config: SocketIoConfig = {url: 'http://localhost:3000', options: {}};
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
    StorageServiceModule,
    SocketIoModule.forRoot(config),
    MatFormFieldModule
  ],
  providers: [UtilsService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
