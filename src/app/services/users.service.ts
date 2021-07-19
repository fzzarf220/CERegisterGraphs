import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { map, take } from 'rxjs/operators';

export interface UserObject {
  email: string
  password: string
}

interface UsersObject {
  [key: string]: UserObject
}

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private USERS = 'users'
  private data: BehaviorSubject<UsersObject> = new BehaviorSubject({})

  constructor() {
    const users = sessionStorage.getItem(this.USERS)

    if (users) {
      this.data.next(JSON.parse(users))
    }
  }

  getUser(email: string): Observable<UserObject> {
    return this.data.asObservable()
      .pipe(
        map(d => {
          if (d[email]) return d[email]
          return {} as UserObject
        }),
        take(1),
      )
  }

  createUser(user: UserObject) {
    const data = {...this.data.value, ...{[user.email]: user}}
    sessionStorage.setItem(this.USERS, JSON.stringify(data))
    this.data.next(data)
    return of(user)
  }
}
