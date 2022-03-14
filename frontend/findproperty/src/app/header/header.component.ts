import { animate, keyframes, state, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'fp-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  animations: [
    trigger('responsiveNav', [
      state('closed', style({
        height: '0px'
      })),
      state('open', style({
        height: '100vh'
      })),
      transition('closed => open', [
        animate('.3s', keyframes([
          style({ height: '100vh' }),
        ]))
      ]),
      transition('open => closed', [
        animate('.3s', keyframes([
          style({ height: '0px' }),
        ]))
      ])
    ])
  ]
})
export class HeaderComponent implements OnInit {

  logoLocation: string = 'assets/img/logo.png';
  navIsOpen: boolean = false;
  
  constructor(
    private titleService: Title
  ) { }

  ngOnInit(): void {
  }

  // this method exposes a global function used for setting the title
  public setTitle(newTitle: string) {
    this.titleService.setTitle(newTitle);

    this.toggleNav();
  }

  toggleNav(): void {
    this.navIsOpen = !this.navIsOpen;
  }

  navAnimationEventHandler(event: AnimationEvent): void {
    // toggle the show and hide of thew second div from here.
  }

}
