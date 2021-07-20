import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MessagesService {
  private messages: BehaviorSubject<any> = new BehaviorSubject([])

  constructor() { }

  setMessage(message: string) {
    const messages = this.messages.value
    messages.push(message)
    this.messages.next(messages)
  }

  clear() {
    this.messages.next([])
  }

  getMessages() {
    return this.messages.asObservable()
  }
}
