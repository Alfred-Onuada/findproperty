import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { faHandHoldingUsd, faHome, faSearchLocation, faTruckMoving } from '@fortawesome/free-solid-svg-icons';
import { IFeatures } from '../interfaces/features';
import { IPartners } from '../interfaces/partners';
import { IProperties } from '../interfaces/properties';
import { IReviews } from '../interfaces/reviews';
import { IStats } from '../interfaces/stats';

@Component({
  selector: 'fp-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {

  constructor(
    private titleService: Title
  ) { }

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

  // for properties card same across entire app
  // on click of load more the properties will simply be added to this list change detection will do it's work
  featuredProperties: IProperties[] = [
    { 
      title: 'Bravo Apollo Apartments',
      description: 'There are many variations of passages of lorem Ipsum available, but the majority have suffered alteration in some form injected.',
      image: ['assets/img/house1.png'],
      highlights: {
        bedsCount: 4,
        bathsCount: 5,
        landArea: 4000,
        roomsCount: 5
      },
      listingType: 'Sale',
      location: '779 6th Ave New York, NY 120400',
      price: 55000
    },
    { 
      title: 'Bravo Apollo Apartments',
      description: 'There are many variations of passages of lorem Ipsum available, but the majority have suffered alteration in some form injected.',
      image: ['assets/img/house2.png'],
      highlights: {
        bedsCount: 4,
        bathsCount: 5,
        landArea: 4000,
        roomsCount: 5
      },
      listingType: 'Sale',
      location: '779 6th Ave New York, NY 120400',
      price: 55000
    },
    { 
      title: 'Bravo Apollo Apartments',
      description: 'There are many variations of passages of lorem Ipsum available, but the majority have suffered alteration in some form injected.',
      image: ['assets/img/house3.png'],
      highlights: {
        bedsCount: 6,
        bathsCount: 2,
        landArea: 9000,
        roomsCount: 9
      },
      listingType: 'Sale',
      location: '779 6th Ave New York, NY 120400',
      price: 140000
    },
    { 
      title: 'Bravo Apollo Apartments',
      description: 'There are many variations of passages of lorem Ipsum available, but the majority have suffered alteration in some form injected.',
      image: ['assets/img/house4.png'],
      highlights: {
        bedsCount: 7,
        bathsCount: 7,
        landArea: 2300,
        roomsCount: 5
      },
      listingType: 'Rent',
      location: '779 6th Ave New York, NY 120400',
      price: 27000
    }
  ]

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

  // this method exposes a global function used for setting the title
  public setTitle(newTitle: string) {
    this.titleService.setTitle(newTitle);
  }

  onResize(event: Event | any) : void {
    this.breakpoint = event.target.innerWidth <= 480 ? 2 : 4;
  }

  loadMore() : void {
    this.featuredProperties.push(...this.featuredProperties);
  }

  ngOnInit(): void {
  }

}
