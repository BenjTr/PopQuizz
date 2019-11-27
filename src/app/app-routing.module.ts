import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GameComponent } from './game/game.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { HomeComponent } from './home/home.component';
import { UserComponent } from './user/user.component';
import { ConfirmationComponent } from './confirmation/confirmation.component';
import { ChangePasswordComponent } from './change-password/change-password.component';


const routes: Routes = [
  { path: 'game', component: GameComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'home', component: HomeComponent },
  { path: 'user', component: UserComponent },
  { path: 'login', component: LoginComponent },
  { path: 'confirmation', component: ConfirmationComponent },
  { path: 'change-password', component: ChangePasswordComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
