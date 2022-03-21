import { Component, Input, OnInit } from '@angular/core';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { faStar } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'fp-stars',
  templateUrl: './stars.component.html',
  styleUrls: ['./stars.component.css']
})
export class StarsComponent implements OnInit {

  @Input() rating!: number;
  
  starIcon: IconProp = faStar;
  // const for the rating width container will probably change on differnt screens
  maxStarContainerWidth: number = 112;

  ratingWidth: number = 0;

  constructor() {
  }

  ngOnInit(): void {
    // finding the percentage of the rating
    this.ratingWidth = (this.rating / 5) * this.maxStarContainerWidth;
  }

}
