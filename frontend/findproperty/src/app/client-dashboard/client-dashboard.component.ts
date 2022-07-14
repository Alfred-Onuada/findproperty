import { Component, OnInit } from '@angular/core';
import { MatPaginatorIntl, PageEvent } from '@angular/material/paginator';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { faAngleLeft, faAngleRight, faBookmark, faCog, faCommentDots, faDollarSign, faEllipsisV, faFilter, faHandHoldingUsd, faHeart, faSearch, faSignOutAlt, faSortAmountUpAlt } from '@fortawesome/free-solid-svg-icons';
import { Subscription } from 'rxjs';
import { IAppliedPropertiesOnDashBoard } from '../interfaces/appledPropertiesOnDashboard';
import { CheckAuthService } from '../services/auth/checkAuth.service';
import { AppliedPorpertiesService } from '../services/models/appliedProperties.service';
import { CustomPaginator } from './custom-paginator';

@Component({
  selector: 'fp-client-dashboard',
  templateUrl: './client-dashboard.component.html',
  styleUrls: ['./client-dashboard.component.css'],
  providers: [
    { provide: MatPaginatorIntl, useValue: CustomPaginator() }
  ]
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

  propertyCount: number = 0;
  propertyPerPage: number = 5;

  propertiesSub$!: Subscription;
  appliedPropertiesSub$!: Subscription;
  sellersSub$!: Subscription;

  buyerId: string = '';

  // controls preloader
  recordsAreLoading: boolean = true;
  loaderDiameter: number = 70;
  loaderWidth: number = 3;

  constructor(
    private appliedPropertiesService: AppliedPorpertiesService,
    private authService: CheckAuthService
  ) { }


  ngOnInit(): void {
    this.authService.getCurrentLoggedInUser()
      .subscribe({
        next: (userInfo) => {
          
          if (userInfo.role !== this.buyerRole) {
            return this.hardError = {
              status: 401,
              message: "You don not have sufficient priviledges to access the page, please try again from an account with that priviledge"
            }
          }

          this.buyerId = userInfo.id;
          
          return this.retrieveInformationAboutCurrentUser(this.buyerId, this.propertyPerPage);

        },
        error: err => this.hardError = err
      });

    // this willcheck the error status to see if it is the error of getting id and then it will prevent 
    // the rest of the code from executing and display the error message
    if (this.hardError) {
      return;
    }

  }

  retrieveInformationAboutCurrentUser(buyerId: string, count: number, offset: number = 0): void {
    
    this.recordsAreLoading = true;
    this.appliedProperties = [];

    // get the buyer id, get the applied properties and transform into a format useful on the view
    // switchmap activates the next observable when the first is done just like promise.then in regular js

    this.appliedPropertiesSub$ = this.appliedPropertiesService.getRecordsByBuyerId(buyerId, count, offset).subscribe({
      next: appliedPropertiesData => {
        this.appliedProperties = appliedPropertiesData;
        this.propertyCount = appliedPropertiesData[0].totalProperties
      },
      error: error => this.hardError = error,
      complete: () => this.recordsAreLoading = false
    })

  }

  switchSection(sectionName: string): void {
    this.activeSection = sectionName;
  }

  handlePageChange(event: PageEvent): void {

    let nextIndex = event.pageIndex * event.pageSize;

    console.log(this.propertyPerPage, nextIndex);

    if (event.pageSize !== this.propertyPerPage) {
      this.propertyPerPage = event.pageSize;
      this.retrieveInformationAboutCurrentUser(this.buyerId, this.propertyPerPage, 0);

      return;
    }

    if (nextIndex < event.length) {
      this.retrieveInformationAboutCurrentUser(this.buyerId, this.propertyPerPage, nextIndex);
    }

  }

}
