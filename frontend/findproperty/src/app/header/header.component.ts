import { animate, keyframes, state, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { faBell, faSearch } from '@fortawesome/free-solid-svg-icons';

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
    ]),
    trigger('hamburgerAnimation-top', [
      state('crossed', style({
        width: '33px',
        transform: 'rotate(45deg) translate(11px, 0px)'
      })),
      state('flat', style({
        width: '22px',
        transform: 'rotate(0deg)'
      })),
      transition('flat => crossed', [
        animate('.3s', style({
          width: '33px',
          transform: 'rotate(45deg) translate(11px, 0px)'
        }))
      ]),
      transition('crossed => flat', [
        animate('.3s', style({
          width: '22px',
          transform: 'rotate(0deg)'
        }))
      ])
    ]),
    trigger('hamburgerAnimation-mid', [
      state('visible', style({
        opacity: '1',
        transform: 'translateX(0px)'
      })),
      state('hidden', style({
        opacity: '0',
        transform: 'translateX(-50px)'
      })),
      transition('visible => hidden', [
        animate('.3s', style({ 
          opacity: '0',
          transform: 'translateX(-50px)'
        }))
      ]),
      transition('hidden => visible', [
        animate('.3s', style({ 
          opacity: '1',
          transform: 'translateX(0px)'
        }))
      ])
    ]),
    trigger('hamburgerAnimation-bottom', [
      state('crossed', style({
        width: '33px',
        transform: 'rotate(-45deg) translate(11px, 0px)'
      })),
      state('flat', style({
        width: '28px',
        transform: 'rotate(0deg)'
      })),
      transition('flat => crossed', [
        animate('.3s', style({
          width: '33px',
          transform: 'rotate(-45deg) translate(11px, 0px)'
        }))
      ]),
      transition('crossed => flat', [
        animate('.3s', style({
          width: '28px',
          transform: 'rotate(0deg)'
        }))
      ])
    ]),
  ]
})
export class HeaderComponent implements OnInit {

  logoLocation: string = 'assets/img/logo.png';
  navIsOpen: boolean = false;
  isMobile: boolean = window.innerWidth < 825;

  // some validation of the jwt from your cookies will help me determine if your logged in
  isLoggedIn: boolean = true;
  thereIsNotification: boolean = true;

  // details gotten from the service
  profileDisplayName: string = 'Jolomi Olajide';
  profileImg: string = 'assets/img/agent1.png';
  profileImgAlt: string = `Image of ${this.profileDisplayName}`;

  searchIcon: IconProp = faSearch;
  notificationIcon: IconProp = faBell;
  
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
    this.isMobile = window.innerWidth < 825;
    
    this.navIsOpen = this.isMobile ? !this.navIsOpen : this.navIsOpen;
  }

  navAnimationEventHandler(event: AnimationEvent): void {
    // toggle the show and hide of thew second div from here.
  }

}
