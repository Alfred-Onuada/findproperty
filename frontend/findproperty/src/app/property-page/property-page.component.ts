import { Component, OnInit } from '@angular/core';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { faAddressBook, faBath, faBed, faEye, faHeart, faRulerHorizontal, faSearchLocation } from '@fortawesome/free-solid-svg-icons';
import { IAgent } from '../interfaces/agent';
import { IProperties } from '../interfaces/properties';

@Component({
  selector: 'fp-property-page',
  templateUrl: './property-page.component.html',
  styleUrls: ['./property-page.component.css']
})
export class PropertyPageComponent implements OnInit {

  // cols dependent on breakpoint
  breakpoint:number = window.innerWidth <= 480 ? 2 : 4;

  // favoriteIcon
  favoriteIcon: IconProp = faHeart;
  isFavorite: boolean = false;

  // property icons
  contactIcon: IconProp = faAddressBook;
  viewsIcon: IconProp = faEye;
  locationIcon: IconProp = faSearchLocation; 
  bedIcon: IconProp = faBed;
  bathIcon: IconProp = faBath;
  roomIcon: IconProp = faBed;
  landIcon: IconProp = faRulerHorizontal;

  // agent data
  agentData: IAgent = {
    _id: '',
    image: 'assets/img/agent-image.png',
    name: 'Jolomi Olajide',
    duration: 2,
    rating: 3.5
  }

  // property images will be gotten from db
  propertyInfo: IProperties = {
    _id: '',
    title: 'Bravo Apollo Apartments',
    date: 'Posted 5 days ago',
    views: 502,
    images: [
      { image: 'assets/img/house1.png', title: '' },
      { image: 'assets/img/house3.png', title: '' },
      { image: 'assets/img/house2.png', title: '' },
      { image: 'assets/img/house4.png', title: '' },
      { image: 'assets/img/house1.png', title: '' },
      { image: 'assets/img/house2.png', title: '' },
      { image: 'assets/img/house4.png', title: '' },
      { image: 'assets/img/house3.png', title: '' },
    ],
    description: 'There are many variations of passages of lorem Ipsum available, but the majority have suffered alteration in some form injected.There are many variations of passages of lorem Ipsum available, but the majority have suffered alteration in some form injected.There are many variations of passages of lorem Ipsum available, but the majority have suffered alteration in some form injected. There are many variations of passages of lorem Ipsum available, but the majority have suffered alteration in some form injected.',
    location: '779 6th Ave New York, NY 120400',
    price: 425000,
    listingType: 'Sale',
    highlights: {
      bedsCount: 4,
      bathsCount: 5,
      landArea: 4000,
      roomsCount: 5
    },
    sellerId: ''
  }

  // for properties card same across entire app
  // on click of load more the properties will simply be added to this list change detection will do it's work
  relatedProperties: IProperties[] = [
    { 
      title: 'Bravo Apollo Apartments',
      description: 'There are many variations of passages of lorem Ipsum available, but the majority have suffered alteration in some form injected.',
      images: [
        { image: 'assets/img/house1.png', title: '' }
      ],
      highlights: {
        bedsCount: 4,
        bathsCount: 5,
        landArea: 4000,
        roomsCount: 5
      },
      listingType: 'Sale',
      location: '779 6th Ave New York, NY 120400',
      price: 55000,
      date: '',
      views: 0,
      _id: '',
      sellerId: ''
    },
    { 
      title: 'Bravo Apollo Apartments',
      description: 'There are many variations of passages of lorem Ipsum available, but the majority have suffered alteration in some form injected.',
      images: [
        { image: 'assets/img/house2.png', title: '' }
      ],
      highlights: {
        bedsCount: 4,
        bathsCount: 5,
        landArea: 4000,
        roomsCount: 5
      },
      listingType: 'Sale',
      location: '779 6th Ave New York, NY 120400',
      price: 55000,
      date: '',
      views: 0,
      _id: '',
      sellerId: ''
    },
    { 
      title: 'Bravo Apollo Apartments',
      description: 'There are many variations of passages of lorem Ipsum available, but the majority have suffered alteration in some form injected.',
      images: [
        { image: 'assets/img/house3.png', title: '' }
      ],
      highlights: {
        bedsCount: 6,
        bathsCount: 2,
        landArea: 9000,
        roomsCount: 9
      },
      listingType: 'Sale',
      location: '779 6th Ave New York, NY 120400',
      price: 140000,
      date: '',
      views: 0,
      _id: '',
      sellerId: ''
    },
    { 
      title: 'Bravo Apollo Apartments',
      description: 'There are many variations of passages of lorem Ipsum available, but the majority have suffered alteration in some form injected.',
      images: [
        { image: 'assets/img/house4.png', title: '' }
      ],
      highlights: {
        bedsCount: 7,
        bathsCount: 7,
        landArea: 2300,
        roomsCount: 5
      },
      listingType: 'Rent',
      location: '779 6th Ave New York, NY 120400',
      price: 27000,
      date: '',
      views: 0,
      _id: '',
      sellerId: ''
    }
  ]

  constructor() { }

  ngOnInit(): void {
  }

  loadMoreRelatedProperties() : void {
    this.relatedProperties.push(...this.relatedProperties);
  }

}
