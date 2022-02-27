import { Component, OnInit, Input } from '@angular/core';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { faBath, faBed, faRobot, faRulerHorizontal, faSearchLocation } from '@fortawesome/free-solid-svg-icons';
import { IProperties } from '../interfaces/properties';

@Component({
  selector: 'fp-property-card',
  templateUrl: './property-card.component.html',
  styleUrls: ['./property-card.component.css']
})
export class PropertyCardComponent implements OnInit {

  // the relevant info will be recieved from the parent component
  @Input() propertyInfo!: IProperties;

  locationIcon: IconProp = faSearchLocation; 
  bedIcon: IconProp = faBed;
  bathIcon: IconProp = faBath;
  roomIcon: IconProp = faBed;
  landIcon: IconProp = faRulerHorizontal;

  constructor() { }

  ngOnInit(): void {
  }

}
