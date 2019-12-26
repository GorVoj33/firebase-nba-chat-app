import { Component, OnInit } from '@angular/core';
import { ChatroomService } from 'src/app/services/chatroom.service';
import { User } from 'src/app/classes/user.interface.model';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-chatroom-list',
  templateUrl: './chatroom-list.component.html',
  styleUrls: ['./chatroom-list.component.css']
})
export class ChatroomListComponent implements OnInit {
  
  constructor(public chatroomService: ChatroomService) { }

  ngOnInit() {
    
  }

}
