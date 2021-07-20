import { Component, OnInit } from '@angular/core'
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { debounceTime, tap } from 'rxjs/operators'
import { MessagesService } from 'src/app/services/messages.service';
import { SessionService } from '../../../app/services/session.service';
import { UsersService } from '../../../app/services/users.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.sass']
})
export class RegisterComponent implements OnInit {
  form = this.fb.group({
    email: ['', Validators.required],
    password: ['', Validators.required],
    passwordConfirm: ['', Validators.required]
  })

  constructor(
    private fb: FormBuilder,
    private usersService: UsersService,
    private router: Router,
    private sessionService: SessionService,
    private messagesService: MessagesService
  ) { }

  ngOnInit(): void {
    this.sessionService.clearSession()

    this.form.valueChanges.pipe(
      debounceTime(100),
      tap((v) => {
        if (v.password !== v.passwordConfirm) {
          this.form.get('passwordConfirm')?.setErrors({notMatching: 'notMatching'})
        }
      })
    ).subscribe()
  }

  onSubmit() {
    const {email, password} = this.form.value
    this.usersService.createUser({email, password})
    this.messagesService.setMessage(`User '${email}' created successfully`)
    this.router.navigate(['/'])
  }
}
