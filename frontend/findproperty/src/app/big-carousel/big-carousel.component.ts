import { Component, Input, OnInit } from '@angular/core';
import { IHomeCarousel } from '../interfaces/homecarousel';

@Component({
  selector: 'fp-big-carousel',
  templateUrl: './big-carousel.component.html',
  styleUrls: ['./big-carousel.component.css']
})
export class BigCarouselComponent implements OnInit {

  @Input() slides!: IHomeCarousel[]; // it's never going to be a string[] but the interface kind of specifies that

  // holds info about the current slide
  current: IHomeCarousel = { image: '', title: '' };
  currentIndex: number = 0;

  constructor() { 
  }

  ngOnInit(): void {
    this.current = this.slides[0];
  }

  jumpToSlide(index: number) {
    this.current = this.slides[index];
    this.currentIndex = index;
  }

}
