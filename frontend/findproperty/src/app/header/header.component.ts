import { animate, keyframes, state, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { NavigationCancel, NavigationEnd, NavigationError, NavigationStart, Router } from '@angular/router';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { faBell, faSearch } from '@fortawesome/free-solid-svg-icons';
import { Observable, of, filter, map } from 'rxjs';
import { AuthService } from '../services/auth/auth.service';
import { BuyerService } from '../services/models/buyers.service';
import { SellerService } from '../services/models/sellers.service';

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

  private readonly adminRole: number = 1;
  private readonly sellerRole: number =  2;
  private readonly buyerRole: number = 3;

  // hard errors are actual error, like backend or frontend error
  hardError: Object = {};
  // soft errors are actions that will produce no effect like requesting for more properties than you have
  softError: Object = {};

  logoLocation: string = 'assets/img/logo.png';
  navIsOpen: boolean = false;
  isMobile: boolean = window.innerWidth < 825;
  navBarIsSticky: boolean = false;

  // some validation of the jwt from your cookies will help me determine if your logged in
  isLoggedIn: boolean = false;
  thereIsNotification: boolean = false;

  // details gotten from the service
  profileDisplayName: string = '';
  profileImg: string = '';
  profileImgAlt: string = '';

  searchIcon: IconProp = faSearch;
  notificationIcon: IconProp = faBell;

  // navigation event preloader
  navigationIsLoading$: Observable<Boolean> = of(false);
  
  constructor(
    private titleService: Title,
    private authService: AuthService,
    private sellerService: SellerService,
    private buyerService: BuyerService,
    private router: Router
  ) { }

  ngOnInit(): void {

    this.authService.getCurrentLoggedInUser()
      .subscribe({
        next: userInfo => {
          if (userInfo == null) {
            return;
          }
          
          this.getUserInformation(userInfo.id, userInfo.role);
        },
        error: err => this.hardError = err
      })

    this.router.events.pipe(filter(
      (e) =>
        e instanceof NavigationStart ||
        e instanceof NavigationEnd ||
        e instanceof NavigationCancel ||
        e instanceof NavigationError
      ),
      map(e => {
        if (e instanceof NavigationStart) {
          return true;
        } else if (e instanceof NavigationEnd) {
          return false;
        }

        return false
      }),
    ).subscribe(
      // later on you will need to handle route navigation errors so re implement this with a switch statement
      (state) => { 
        this.navigationIsLoading$ = of(state)
      }
    );
  }

  stickyNavBar(): void {
    if (window.scrollY > 0) {
      this.navBarIsSticky = true;
    } else {
      this.navBarIsSticky = false;
    }
  }

  getUserInformation(id: string, role: number): void {
    
    if (role === this.adminRole) {
      throw Error("No admin configuration at the moment");
    } else if (role === this.sellerRole) {
      this.sellerService.getSellerById(id)
        .subscribe({
          next: seller => {
            this.profileDisplayName = seller.name,
            this.profileImg = seller.image,
            this.profileImgAlt = `Image of ` + this.profileDisplayName;

            this.isLoggedIn = true;
          },
          error: err => this.hardError = err
        })
    } else if (role === this.buyerRole) {
      this.buyerService.getBuyerById(id)
      .subscribe({
        next: buyer => {
          this.profileDisplayName = buyer.name,
          this.profileImg = buyer.image,
          this.profileImgAlt = `Image of ` + this.profileDisplayName;

          this.isLoggedIn = true;
        },
        error: err => this.hardError = err
      })
    }
    
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
