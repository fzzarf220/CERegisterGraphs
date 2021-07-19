import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserObject, UsersService } from 'src/app/services/users.service';
import { filter, tap } from 'rxjs/operators'
import { SessionService } from 'src/app/services/session.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass']
})
export class LoginComponent implements OnInit {
  form = this.fb.group({
    email: ['', Validators.required],
    password: ['', Validators.required]
  })

  constructor(
    private fb: FormBuilder, 
    private usersService: UsersService,
    private router: Router,
    private sessionService: SessionService
  ) { }

  ngOnInit(): void {
    this.sessionService.clearSession()
  }

  onSubmit() {
    const {email, password} = this.form.value
    
    this.usersService.getUser(email).pipe(
      tap((user: UserObject) => {
        if (user && user.password === password) {
          this.sessionService.createSession(user)
          this.router.navigate(['/home'])
        }
        else {
          if (!user.password || user.password !== password) this.form.get('password')?.setErrors({error: 'invalid password'})
          if (!user.email) this.form.get('email')?.setErrors({error: 'invalid email'})
        }
      })
    ).subscribe()

  }

}
