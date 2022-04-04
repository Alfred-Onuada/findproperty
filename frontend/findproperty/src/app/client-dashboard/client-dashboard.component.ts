import { Component, OnInit } from '@angular/core';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { faAngleLeft, faAngleRight, faBookmark, faCog, faCommentDots, faDollarSign, faEllipsisV, faFilter, faHandHoldingUsd, faHeart, faSearch, faSignOutAlt, faSortAmountUpAlt } from '@fortawesome/free-solid-svg-icons';
import { Subscription } from 'rxjs';
import { switchMap, map } from 'rxjs/operators';
import { IAgent } from '../interfaces/agent';
import { IAppliedPropertiesOnDashBoard } from '../interfaces/appledPropertiesOnDashboard';
import { IBuyers } from '../interfaces/buyers';
import { IProperties } from '../interfaces/properties';
import { IPropertyTransactions } from '../interfaces/propertyTransactions';
import { CheckAuthService } from '../services/auth/checkAuth.service';
import { AppliedPorpertiesService } from '../services/models/appliedProperties.service';
import { BuyerService } from '../services/models/buyers.service';
import { PropertyService } from '../services/models/properties.service';
import { SellerService } from '../services/models/sellers.service';

@Component({
  selector: 'fp-client-dashboard',
  templateUrl: './client-dashboard.component.html',
  styleUrls: ['./client-dashboard.component.css']
})
export class ClientDashboardComponent implements OnInit {

  private readonly buyerRole: number = 3;

  // hard errors are actual error, like backend or frontend error
  hardError: Object = {};
  // soft errors are actions that will produce no effect like requesting for more properties than you have
  softError: Object = {};

  // icons for the side nav
  settingsIcon: IconProp = faCog;
  favoritesIcon: IconProp = faHeart;
  searchIcon: IconProp = faSearch;
  appliedIcon: IconProp = faBookmark;
  conversationsIcon: IconProp = faCommentDots;
  purchaseIcon: IconProp = faDollarSign;
  rentedIcon: IconProp = faHandHoldingUsd;
  logoutIcon: IconProp = faSignOutAlt;

  // icons for applied page
  prevPageIcon: IconProp = faAngleLeft;
  nextPageIcon: IconProp = faAngleRight;
  filterIcon: IconProp = faFilter;
  sortIcon: IconProp = faSortAmountUpAlt;
  moreVerticalIcon: IconProp = faEllipsisV;

  activeSection: string = 'already applied';

  appliedProperties: IAppliedPropertiesOnDashBoard[] = []

  propertyIndexStart: number = 0;
  propertyIndexEnd: number = 0;
  propertyCount: number = 0;
  propertyPerPage: number = 10;

  propertiesSub$!: Subscription;
  buyersSub$!: Subscription;
  appliedPropertiesSub$!: Subscription;
  sellersSub$!: Subscription;

  constructor(
    private propertiesService: PropertyService,
    private buyerService: BuyerService,
    private sellerService: SellerService,
    private appliedPropertiesService: AppliedPorpertiesService,
    private authService: CheckAuthService
  ) { }


  ngOnInit(): void {
    let buyerId = "";

    this.authService.getCurrentLoggedInUser()
      .subscribe({
        next: (userInfo) => {
          
          if (userInfo.role !== this.buyerRole) {
            return this.hardError = {
              status: 401,
              message: "You don not have sufficient priviledges to access the page, please try again from an account with that priviledge"
            }
          }

          buyerId = userInfo.id;
          
          return this.retrieveInformationAboutCurrentUser(buyerId);
        },
        error: err => this.hardError = err
      });

    // this willcheck the error status to see if it is the error of getting id and then it will prevent 
    // the rest of the code from executing and display the error message
    if (this.hardError) {
      return;
    }

  }

  retrieveInformationAboutCurrentUser(buyerId: string): void {
    
    // get the buyer id, get the applied properties and transform into a format useful on the view
    // switchmap activates the next observable when the first is done just like promise.then in regular js
    this.buyersSub$ = this.buyerService.getBuyerById(buyerId).pipe(
      switchMap((buyerDetails: IBuyers[]) => {

        return this.appliedPropertiesService.getRecordsByBuyerId(buyerDetails[0]._id).pipe(
          switchMap((appliedProperties: IPropertyTransactions[]) => { 
            let records: IAppliedPropertiesOnDashBoard[] = [];

            appliedProperties.forEach(
              (appliedProperty) => {

                // has to be initialized
                let data: IAppliedPropertiesOnDashBoard = {
                  activeSince: new Date("2022-03-31T15:38:17.621Z"),
                  agentName: '',
                  id: '',
                  image: '',
                  lastUpdate: '',
                  name: '',
                  price: 0,
                  propertyUploadtime: new Date("2022-03-31T15:38:17.621Z"),
                };
                
                // from the sellers
                this.sellerService.getSellerById(appliedProperty.sellerId).pipe(
                  map((seller: IAgent[]) => {
                    data.agentName = seller[0].name
                  })
                ).subscribe()

                // from the properties
                this.propertiesService.getPropertyById(appliedProperty.propertyId).pipe(
                  map((property: IProperties[]) => {
                    data.image = property[0].images[0].image,
                    data.name = property[0].title,
                    data.price = property[0].price,
                    data.propertyUploadtime = new Date(property[0].date)
                  })
                ).subscribe()

                // from the applied properties
                data.id = appliedProperty._id;
                data.activeSince = new Date(appliedProperty.date);

                // hardcoding this for now will be gotten from mongodb
                data.lastUpdate = 'last updated 4 days ago'

                records.push(data)
              }
            )

            return records;
          })
        )

      })
    ).subscribe({
      next: appliedPropertiesData => {
        this.appliedProperties.push(appliedPropertiesData);
      },
      error: error => this.hardError = error,
      complete: () => {
        this.updatePaginationInfo();
      }
    })

  }

  switchSection(sectionName: string): void {
    this.activeSection = sectionName;
  }

  updatePaginationInfo(): void {
    this.propertyCount = this.appliedProperties.length;
    this.propertyIndexStart = this.propertyCount > 0 ? 1 : 0;
    this.propertyIndexEnd = this.propertyCount > this.propertyPerPage ? this.propertyIndexStart + this.propertyPerPage : this.propertyCount;
  }

}
