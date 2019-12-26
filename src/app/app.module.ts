import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './core/navbar/navbar.component';
import { ChatComponent } from './core/chat/chat.component';
import { CustomMaterialModule } from './custom-angular-material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './core/login/login.component';
import { RegisterComponent } from './core/register/register.component';
import { UserProfileComponent } from './core/user-profile/user-profile.component';
import { environment } from 'src/environments/environment';

import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ChatInputComponent } from './core/chat/chat-input/chat-input.component';
import { ChatMessageComponent } from './core/chat/chat-message/chat-message.component';
import { ChatroomTitleBarComponent } from './core/chat/chatroom-title-bar/chatroom-title-bar.component';
import { ChatroomListComponent } from './core/chat/chatroom-list/chatroom-list.component';
import { ChatroomWindowComponent } from './core/chat/chatroom-window/chatroom-window.component';
import { GamesComponent } from './core/chat/games/games.component';
import { PlayersComponent } from './core/chat/players/players.component';
import { UserProfileEditComponent } from './core/user-profile/user-profile-edit/user-profile-edit.component';
//import { AngularFireModule } from '@angular/fire/auth';
// import { AngularFirestoreModule } from 'angularfire2/firestore';
// import { AngularFireStorageModule } from 'angularfire2/storage';
// import { AngularFireAuthModule } from 'angularfire2/auth';
// import {BsDropdownModule} from './node_module/ngx-bootstrap/dropdown';
@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    ChatComponent,
    LoginComponent,
    RegisterComponent,
    UserProfileComponent,
    ChatInputComponent,
    ChatMessageComponent,
    ChatroomTitleBarComponent,
    ChatroomListComponent,
    ChatroomWindowComponent,
    GamesComponent,
    PlayersComponent,
    UserProfileEditComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CustomMaterialModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule, 
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AngularFireStorageModule,
    AngularFireAuthModule
    // BsDropdownModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
