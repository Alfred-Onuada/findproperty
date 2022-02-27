import { Component, Input, OnInit } from '@angular/core';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { faQuoteLeft } from '@fortawesome/free-solid-svg-icons';
import { IReviews } from '../interfaces/reviews';
import { trigger, transition, style, animate } from '@angular/animations'

@Component({
  selector: 'fp-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.css'],
  animations: [
    trigger('carouselAnimation', [
      transition('void => *', [
        style({ opacity: 0 }),
        animate('1000ms', style({ opacity: 1 }))
      ]),
      transition('* => void', [
        animate('0ms', style({ opacity: 0 }))
      ])
    ])
  ]
})
export class CarouselComponent implements OnInit {

  // this recieves the slides from parent component
  @Input() slides!: IReviews[];

  quotesIcon: IconProp = faQuoteLeft;

  currentSlide: number = 0;

  constructor() {   }

  nextSlide() : void {
    const next: number = this.currentSlide + 1;
    this.currentSlide = next > this.slides.length - 1 ? 0 : next;
  }

  prevSlide() : void {
    const prev: number = this.currentSlide - 1;
    this.currentSlide = prev < 0 ? this.slides.length - 1 : prev;
  }

  ngOnInit(): void {
  }

}
