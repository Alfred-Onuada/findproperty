import { Component, OnInit } from '@angular/core';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { faAngleLeft, faAngleRight, faBookmark, faCog, faCommentDots, faDollarSign, faEllipsisV, faFilter, faHandHoldingUsd, faHeart, faSearch, faSignOutAlt, faSortAmountUpAlt } from '@fortawesome/free-solid-svg-icons';

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
  moreVerticalIcon: IconProp = faEllipsisV;

  activeSection: string = 'already applied';

  appliedProperties: any[] = [
    {
      id: 'test1',
      image: 'assets/img/house9.png',
      name: 'Lekki Phase 2 apartment',
      price: 8300000,
      agentName: 'Charles Deleany',
      propertyUploadtime: Date.now(),
      activeSince: Date.now(),
      lastUpdate: '4 days ago'
    },
    {
      id: 'test1',
      image: 'assets/img/house9.png',
      name: 'Lekki Phase 2 apartment',
      price: 8300000,
      agentName: 'Charles Deleany',
      propertyUploadtime: Date.now(),
      activeSince: Date.now(),
      lastUpdate: '4 days ago'
    },
    {
      id: 'test1',
      image: 'assets/img/house9.png',
      name: 'Lekki Phase 2 apartment',
      price: 8300000,
      agentName: 'Charles Deleany',
      propertyUploadtime: Date.now(),
      activeSince: Date.now(),
      lastUpdate: '4 days ago'
    },
    {
      id: 'test1',
      image: 'assets/img/house9.png',
      name: 'Lekki Phase 2 apartment',
      price: 8300000,
      agentName: 'Charles Deleany',
      propertyUploadtime: Date.now(),
      activeSince: Date.now(),
      lastUpdate: '4 days ago'
    },
    {
      id: 'test1',
      image: 'assets/img/house9.png',
      name: 'Lekki Phase 2 apartment',
      price: 8300000,
      agentName: 'Charles Deleany',
      propertyUploadtime: Date.now(),
      activeSince: Date.now(),
      lastUpdate: '4 days ago'
    },
    {
      id: 'test1',
      image: 'assets/img/house9.png',
      name: 'Lekki Phase 2 apartment',
      price: 8300000,
      agentName: 'Charles Deleany',
      propertyUploadtime: Date.now(),
      activeSince: Date.now(),
      lastUpdate: '4 days ago'
    },
    {
      id: 'test1',
      image: 'assets/img/house9.png',
      name: 'Lekki Phase 2 apartment',
      price: 8300000,
      agentName: 'Charles Deleany',
      propertyUploadtime: Date.now(),
      activeSince: Date.now(),
      lastUpdate: '4 days ago'
    },
    {
      id: 'test1',
      image: 'assets/img/house9.png',
      name: 'Lekki Phase 2 apartment',
      price: 8300000,
      agentName: 'Charles Deleany',
      propertyUploadtime: Date.now(),
      activeSince: Date.now(),
      lastUpdate: '4 days ago'
    },
    {
      id: 'test1',
      image: 'assets/img/house9.png',
      name: 'Lekki Phase 2 apartment',
      price: 8300000,
      agentName: 'Charles Deleany',
      propertyUploadtime: Date.now(),
      activeSince: Date.now(),
      lastUpdate: '4 days ago'
    },
    {
      id: 'test1',
      image: 'assets/img/house9.png',
      name: 'Lekki Phase 2 apartment',
      price: 8300000,
      agentName: 'Charles Deleany',
      propertyUploadtime: Date.now(),
      activeSince: Date.now(),
      lastUpdate: '4 days ago'
    },
  ]

  propertyIndexStart: number = 1;
  propertyIndexEnd: number = 10;
  propertyCount: number = 3239;
  propertyPerPage: number = 10;

  constructor() { }

  ngOnInit(): void {
  }

  switchSection(sectionName: string): void {
    this.activeSection = sectionName;
  }

}
