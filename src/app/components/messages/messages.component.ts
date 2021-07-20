import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { MessagesService } from 'src/app/services/messages.service';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.sass']
})
export class MessagesComponent implements OnInit {

  messages$: Observable<any> = this.messagesService.getMessages()

  constructor(private messagesService: MessagesService) { }

  ngOnInit(): void {
  }

  clearMessages() {
    this.messagesService.clear()
  }

}
