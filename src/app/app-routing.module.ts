import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ChatComponent } from './core/chat/chat.component';
import { RegisterComponent } from './core/register/register.component';
import { LoginComponent } from './core/login/login.component';
import { UserProfileComponent } from './core/user-profile/user-profile.component';
import { GamesComponent } from './core/chat/games/games.component';
import { PlayersComponent } from './core/chat/players/players.component';
import { UserProfileEditComponent } from './core/user-profile/user-profile-edit/user-profile-edit.component';
import { AuthguardService } from './guards/authguard.service';


const routes: Routes = [
  {path:'',component: LoginComponent},
  //{path:'chat',component: ChatComponent},
  { path: 'chat',
    children: [
      { path: '', component: ChatComponent },
      { path: ':chatroomId', component: ChatComponent, canActivate:[AuthguardService] }
    ]
  },
  {path:'login',component: LoginComponent},
  {path:'games',component: GamesComponent},
  {path:'players',component: PlayersComponent},
  {path:'register',component: RegisterComponent},
  {path: 'profile/:userId', component: UserProfileComponent},
  {path: 'profile/:userId/edit', component: UserProfileEditComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
