import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { faEye } from '@fortawesome/free-regular-svg-icons';
import { faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { IOAuthClients } from '../interfaces/oauthclients';
import { AuthService } from '../services/auth/auth.service';

@Component({
  selector: 'fp-signin',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {

  showPasswordIcon: IconProp = faEye;
  paswordFieldType: string = 'password';

  _password: string = '';
  _email: string = '';

  get password(): string {
    return this._password;
  }

  set password(value: string) {
    this._password = value;
  }

  get email(): string {
    return this._email;
  }

  set email(value: string) {
    this._email = value;
  }

  oAuth: IOAuthClients[] = [
    { icon: 'assets/img/google.png', func: this.oAuthClick },
    { icon: 'assets/img/apple.png', func: this.oAuthClick },
    { icon: 'assets/img/facebook.png', func: this.oAuthClick }
  ]
  
  constructor(
    private titleService: Title,
    private authService: AuthService,
  ) { }

  // this method exposes a global function used for setting the title
  public setTitle(newTitle: string) {
    this.titleService.setTitle(newTitle);
  }

  ngOnInit(): void {
  }

  oAuthClick(): void {
    alert("Xup")
  }

  loginFunc(): boolean {
    this.authService.login(this._email, this._password).subscribe({
      next: (sessionId: string) => {
        window.location.assign('/dashboard');
      },
      error: console.log
    })
    return false;
  }

  alternateShowPassword(): void {
    // using reactive form you will be able to change the input type automatically
    if (this.showPasswordIcon == faEye) {
      this.showPasswordIcon = faEyeSlash;
      this.paswordFieldType = 'text';
    } else {
      this.showPasswordIcon = faEye;
      this.paswordFieldType = 'password';
    }
  }
}
