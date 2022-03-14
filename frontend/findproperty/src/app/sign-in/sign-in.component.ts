import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { faApple, faFacebook, faGoogle } from '@fortawesome/free-brands-svg-icons';
import { faEye } from '@fortawesome/free-regular-svg-icons';
import { faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { IOAuthClients } from '../interfaces/oauthclients';

@Component({
  selector: 'fp-signin',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {

  showPasswordIcon: IconProp = faEye;

  oAuth: IOAuthClients[] = [
    { icon: 'assets/img/google.png', func: this.oAuthClick },
    { icon: 'assets/img/apple.png', func: this.oAuthClick },
    { icon: 'assets/img/facebook.png', func: this.oAuthClick }
  ]
  
  constructor(
    private titleService: Title
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
    return false;
  }

  alternateShowPassword(): void {
    // using reactive form you will be able to change the input type automatically
    if (this.showPasswordIcon == faEye) {
      this.showPasswordIcon = faEyeSlash;
    } else {
      this.showPasswordIcon = faEye;
    }
  }
}
