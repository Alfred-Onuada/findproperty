import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { IOAuthClients } from '../interfaces/oauthclients';

@Component({
  selector: 'fp-signup',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

  showPasswordIcon1: IconProp = faEye;
  showPasswordIcon2: IconProp = faEye;

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

  registerFunc(): boolean {
    return false;
  }

  alternateShowPassword(id: number): void {
    // using reactive form you will be able to change the input type automatically
    if (this.showPasswordIcon1 == faEye && id == 1) {
      this.showPasswordIcon1 = faEyeSlash;
    } else {
      this.showPasswordIcon1 = faEye;
    }

    if (this.showPasswordIcon2 == faEye && id == 2) {
      this.showPasswordIcon2 = faEyeSlash;
    } else {
      this.showPasswordIcon2 = faEye;
    }
  }
}
