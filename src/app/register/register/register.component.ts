import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { FormBuilder, Validators, FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { User } from 'src/app/interfaces/user';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  form = this.fb.group({
    email: ['', [Validators.email, Validators.required]],
    password: ['', [Validators.required, Validators.minLength(6)]],
  });

  user$: Observable<User> = this.authService.user$;

  get emailControl() {
    return this.form.get('email') as FormControl;
  }

  get passwordControl() {
    return this.form.get('password') as FormControl;
  }

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
  ) { }

  ngOnInit(): void {}

  register() {
    this.authService.createUser(this.form.value);
  }

  login() {
    this.authService.login(this.form.value);
  }

  logout() {
    this.authService.logout();
  }

  resetPassword() {
    this.authService.resetPassword(this.form.value.email);
  }

}
