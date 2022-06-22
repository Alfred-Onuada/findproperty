import { Component, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { faFacebookF, faInstagram, faPinterestP, faTelegramPlane, faTwitter, faWhatsapp } from '@fortawesome/free-brands-svg-icons';
import { faCopyright, faEnvelope } from '@fortawesome/free-regular-svg-icons';
import { faAngleUp, faPhone } from '@fortawesome/free-solid-svg-icons';
import { filter, map } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { IIconLinks } from '../interfaces/iconLinks';
import { ILinks } from '../interfaces/links';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'fp-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  // hard errors are actual error, like backend or frontend error
  hardError: Object = {};

  // controls display of footer, not all pages need it
  pageNeedsFooter$: Observable<boolean> = of(true);
  pagesWithoutFooter: string[] = [
    '/dashboard',
  ]

  // go to top icon
  arrowTop = faAngleUp;

  // controls the appearance of the subscribe div
  isRegistered: boolean = false;
  currentRouteIsHomePage$: Observable<boolean> = of(false);

  // for copyright info on footer
  copyright = faCopyright;
  copyrightYear: number = new Date().getFullYear();

  // for the social media post in the footer, eventually it will come from the actual instagram page and a link to it
  socialMediaCols: number =  3;
  socialMediaPosts: string[] = [];

  // for social icons
  socialIconsCols = 4;
  socialIcons: IIconLinks[] = [
    { name: faFacebookF, target: '/' },
    { name: faPinterestP, target: '/' },
    { name: faTelegramPlane, target: '/' },
    { name: faInstagram, target: '/' },
    { name: faTwitter, target: '/' },
    { name: faWhatsapp, target: '/' },
    { name: faEnvelope, target: '/' },
    { name: faPhone, target: '/' },
  ]

  // for links in the footer
  quickAccessLinks: ILinks[] = [
    { name: 'Our Services', target: '/' },
    { name: 'Privacy Policy', target: '/' },
    { name: 'Contact Us', target: '/' },
    { name: 'About Us', target: '/' }
  ];

  constructor(
    private router: Router,
    private titleService: Title
  ) { 
    this.socialMediaPosts = [
      'assets/img/social1.png',
      'assets/img/social2.png',
      'assets/img/social3.png',
      'assets/img/social4.png',
      'assets/img/social5.png',
      'assets/img/social6.png',
    ]
  }

  // this method exposes a global function used for setting the title
  public setTitle(newTitle: string) {
    this.titleService.setTitle(newTitle);
  }

  scrollTop() : void {
    window.scrollTo(0, 0);
  }

  subscribeToEmail() : boolean {
    return false;
  }
  
  ngOnInit(): void {

    // checks if a page needs the footer and decides if to show it or not
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd),
      map(() => this.router.url),
      map(url => this.pagesWithoutFooter.includes(url) == false),
      map(isInPagesWithFooter => isInPagesWithFooter ? true : false)
    ).subscribe({
      next: pageNeedsFooter => this.pageNeedsFooter$ = of(pageNeedsFooter),
      error: err => this.hardError = err
    });

    // checks if the current route is home page and shows permits the subscribe to email box
    this.router.events.pipe(
      filter((e) => e instanceof NavigationEnd),
      map((e) => (e instanceof NavigationEnd && e.url === '/'))
    ).subscribe({
      next: currentRouteIsHomePage => this.currentRouteIsHomePage$ = of(currentRouteIsHomePage),
      error: err => this.hardError = err
    })

  }

}
