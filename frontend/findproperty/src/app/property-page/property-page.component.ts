import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { faAddressBook, faBath, faBed, faEye, faHeart, faRulerHorizontal, faSearchLocation } from '@fortawesome/free-solid-svg-icons';
import { Subscription } from 'rxjs';
import { IAgent } from '../interfaces/agent';
import { IProperties } from '../interfaces/properties';
import { PropertyService } from '../services/models/properties.service';
import { SellerService } from '../services/models/sellers.service';

@Component({
  selector: 'fp-property-page',
  templateUrl: './property-page.component.html',
  styleUrls: ['./property-page.component.css']
})
export class PropertyPageComponent implements OnInit, OnDestroy {

  relatedPropertiesSub$!: Subscription;
  agentSub$!: Subscription;
  propertyInfoSub$!: Subscription;
  routeSub$!: Subscription;

  // hard errors are actual error, like backend or frontend error
  hardError: Object = {};
  // soft errors are actions that will produce no effect like requesting for more properties than you have
  softError: Object = {};

  sellerId: string = '';
  propertyId: string = '';

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
  agentData: IAgent | undefined;

  // property images will be gotten from db
  propertyInfo: IProperties | undefined;

  // for properties card same across entire app
  // on click of load more the properties will simply be added to this list change detection will do it's work
  relatedProperties: IProperties[] = []

  constructor(
    private route: ActivatedRoute,
    private propertyService: PropertyService,
    private sellerService: SellerService
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.sellerId = params['sellerId'] || '';
      this.propertyId = params['propertyId'] || '';
  
      // this will never be null, because if it is the route will automatically match the 404 page
      if (this.sellerId == '' || this.propertyId == '') {
        this.hardError = {
          status: 400,
          message: "Looks like the requested property doesn't exist please confirm you have the correct url"
        }
  
        return;
      }
  
      this.relatedPropertiesSub$ = this.propertyService.getPropertiesBySellerId(this.sellerId, this.propertyId, 4).subscribe({
        next: properties => {
          this.relatedProperties = properties;
        },
        error: error => this.hardError = error,
      })
  
      this.propertyInfoSub$ = this.propertyService.getPropertyById(this.propertyId).subscribe({
        next: properties => {
          this.propertyInfo = properties[0];
        },
        error: error => this.hardError = error,
      })
  
      this.agentSub$ = this.sellerService.getSellerById(this.sellerId).subscribe({
        next: agents => {
          this.agentData = agents[0];
        },
        error: error => this.hardError = error,
      })
    })

  }

  ngOnDestroy(): void {
    this.relatedPropertiesSub$.unsubscribe();
    this.propertyInfoSub$.unsubscribe();
    this.agentSub$.unsubscribe();
  }

  loadMoreRelatedProperties() : void {
    // clear the previous subscription
    this.relatedPropertiesSub$.unsubscribe();

    this.relatedPropertiesSub$ = this.propertyService.getPropertiesBySellerId(this.sellerId, this.propertyId, 4, this.relatedProperties.length).subscribe({
      next: properties => {
        if (properties.length == 0) {
          return this.softError = { status: 400, message: 'No more properties to display, seems like that was the last one'}
        }
        return this.relatedProperties.push(...properties);
      },
      error: error => this.hardError = error
    })
  }

}
