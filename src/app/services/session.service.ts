import { Injectable } from '@angular/core';
import { UserObject } from './users.service';

@Injectable({
  providedIn: 'root'
})
export class SessionService {

  constructor() { }

  createSession(user: UserObject) {
    sessionStorage.setItem('session', user.email)
  }

  isValid(): boolean {
    return !!sessionStorage.getItem('session')
  }

  clearSession() {
    sessionStorage.removeItem('session')
  }
}
