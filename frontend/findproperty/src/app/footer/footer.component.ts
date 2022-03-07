import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { faFacebookF, faInstagram, faPinterestP, faTelegramPlane, faTwitter, faWhatsapp } from '@fortawesome/free-brands-svg-icons';
import { faCopyright, faEnvelope } from '@fortawesome/free-regular-svg-icons';
import { faAngleUp, faPhone } from '@fortawesome/free-solid-svg-icons';
import { filter, map } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { IIconLinks } from '../interfaces/iconLinks';
import { ILinks } from '../interfaces/links';

@Component({
  selector: 'fp-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

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
    { name: 'Privacy Policy', target: '/'},
    { name: 'Contact Us', target: '/'}
  ];

  constructor(private router: Router) { 
    this.socialMediaPosts = [
      'assets/img/social1.png',
      'assets/img/social2.png',
      'assets/img/social3.png',
      'assets/img/social4.png',
      'assets/img/social5.png',
      'assets/img/social6.png',
    ]
  }

  scrollTop() : void {
    window.scrollTo(0, 0);
  }

  subscribeToEmail() : boolean {
    return false;
  }
  
  ngOnInit(): void {
    // this subscribes to the router navigation events and changes the value of the currentRoute each time
    // the map will return either true or false depending on what is returned by filter
    this.currentRouteIsHomePage$ = this.router.events.pipe(
      filter((e) => e instanceof NavigationEnd),
      map((e) => (e instanceof NavigationEnd && e.url === '/'))
    )

    this.currentRouteIsHomePage$.subscribe()
  }

}
