import { Component, OnDestroy, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { faHandHoldingUsd, faHome, faSearchLocation, faTruckMoving } from '@fortawesome/free-solid-svg-icons';
import { Subscription } from 'rxjs';
import { IFeatures } from '../interfaces/features';
import { IPartners } from '../interfaces/partners';
import { IProperties } from '../interfaces/properties';
import { IReviews } from '../interfaces/reviews';
import { IStats } from '../interfaces/stats';
import { PropertyService } from '../services/properties.service';

@Component({
  selector: 'fp-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit, OnDestroy {

  // holds the subscription to get required data
  sub$!: Subscription;

  // hard errors are actual error, like backend or frontend error
  hardError: Object = {};
  // soft errors are actions that will produce no effect like requesting for more properties than you have
  softError: Object = {};

  title = 'findproperty';
  topImage = 'assets/img/top-image.png';

  // for the partners section
  partners: IPartners[] = [
    { name: 'Google', image: 'assets/img/comp1.png' },
    { name: 'Google', image: 'assets/img/comp2.png' },
    { name: 'Google', image: 'assets/img/comp3.png' },
    { name: 'Google', image: 'assets/img/comp4.png' },
  ]

  // cols dependent on breakpoint
  breakpoint:number = window.innerWidth <= 480 ? 2 : 4;

  // for the icons under the brief bio
  bioStats: IStats[] = [
    { name: 'Properties Listed', count: 35000, icon: faHome},
    { name: 'Properties Sold', count: 41765, icon: faHandHoldingUsd}
  ]

  // for the moving family section
  movingFamilyImage: string = 'assets/img/family.png';

  // for the features
  features: IFeatures[] = [
    { icon: faHandHoldingUsd, title: 'Buy & Sell Properties', description: 'There are many variations of passages of Lorem Ipsum available but the majority suffered.' },
    { icon: faSearchLocation, title: 'Perfect Location', description: 'There are many variations of passages of Lorem Ipsum available but the majority suffered.' },
    { icon: faTruckMoving, title: 'Faster Services', description: 'There are many variations of passages of Lorem Ipsum available but the majority suffered.' },
  ] 

  featuredProperties: IProperties[] = []

  // for the carousel
  customerReviews: IReviews[] = [
    {
      image: "assets/img/customer1.png",
      review: "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration There are many variations of is a passages of lorem Ipsum.",
      customerName: "Mark Zilensky",
      customerOrganization: "Amazon"
    },
    {
      image: "assets/img/customer2.png",
      review: "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration There are many variations of is a passages of lorem Ipsum.",
      customerName: "Ellen McCarthy",
      customerOrganization: "Apple Inc"
    },
    {
      image: "assets/img/customer3.png",
      review: "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration There are many variations of is a passages of lorem Ipsum.",
      customerName: "Edward Mbo",
      customerOrganization: "Trump Media and Information"
    },
    {
      image: "assets/img/customer4.png",
      review: "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration There are many variations of is a passages of lorem Ipsum.",
      customerName: "Gabriella Jackson",
      customerOrganization: "Google LLC"
    }
  ]

  constructor(
    private titleService: Title,
    private propertyService: PropertyService
  ) { }

  ngOnInit(): void {
    this.sub$ = this.propertyService.getProperties(4).subscribe({
      next: properties => {
        this.featuredProperties = properties
      },
      error: error => this.hardError = error
    })
  }

  ngOnDestroy(): void {
    this.sub$.unsubscribe()
  }

  // this method exposes a global function used for setting the title
  public setTitle(newTitle: string) {
    this.titleService.setTitle(newTitle);
  }

  onResize(event: Event | any) : void {
    this.breakpoint = event.target.innerWidth <= 480 ? 2 : 4;
  }

  loadMore() : void {
    // clear the previous subscription
    this.sub$.unsubscribe();

    this.sub$ = this.propertyService.getProperties(4, this.featuredProperties.length).subscribe({
      next: properties => {
        if (properties.length == 0) {
          return this.softError = { status: 400, message: 'No more properties to display, seems like that was the last one'}
        }
        return this.featuredProperties.push(...properties);
      },
      error: error => this.hardError = error
    })
  }

}
