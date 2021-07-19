import { Component, OnInit } from '@angular/core'
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import {debounceTime, tap} from 'rxjs/operators'
import { SessionService } from 'src/app/services/session.service';
import { UsersService } from 'src/app/services/users.service';

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
    private sessionService: SessionService
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
    this.router.navigate(['/'])
  }
}
