import { Component, OnInit } from '@angular/core';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { faAngleLeft, faAngleRight, faBookmark, faCog, faCommentDots, faDollarSign, faFilter, faHandHoldingUsd, faHeart, faSearch, faSignOutAlt, faSortAmountUpAlt } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'fp-client-dashboard',
  templateUrl: './client-dashboard.component.html',
  styleUrls: ['./client-dashboard.component.css']
})
export class ClientDashboardComponent implements OnInit {

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

  activeSection: string = 'already applied';

  propertyIndexStart: number = 1;
  propertyIndexEnd: number = 8;
  propertyCount: number = 3239;
  propertyPerPage: number = 8;

  constructor() { }

  ngOnInit(): void {
  }

  switchSection(sectionName: string): void {
    this.activeSection = sectionName;
  }

}
