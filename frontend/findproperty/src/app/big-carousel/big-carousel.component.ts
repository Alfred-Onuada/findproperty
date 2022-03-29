import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { faAngleLeft, faAngleRight } from '@fortawesome/free-solid-svg-icons';
import { IHomeCarousel } from '../interfaces/homecarousel';

@Component({
  selector: 'fp-big-carousel',
  templateUrl: './big-carousel.component.html',
  styleUrls: ['./big-carousel.component.css']
})
export class BigCarouselComponent implements OnInit, OnChanges {

  @Input() slides!: IHomeCarousel[]; // it's never going to be a string[] but the interface kind of specifies that

  // holds info about the current slide
  current: IHomeCarousel = { image: '', title: '' };
  currentIndex: number = 0;

  rightArrow: IconProp = faAngleRight;
  leftArrow: IconProp = faAngleLeft;

  constructor() { 
  }

  ngOnInit(): void {
    this.current = this.slides[0];
  }

  ngOnChanges(changes: SimpleChanges): void {
    // the current & currentSlide are not tied to the parent component so they wont change automatically
    this.current = this.slides[0];
    this.currentIndex = 0;
  }

  jumpToSlide(index: number) {
    this.current = this.slides[index];
    this.currentIndex = index;
  }

  moveRight(): void {
    this.currentIndex++;
    this.current = this.slides[this.currentIndex];
  }

  moveLeft(): void {
    this.currentIndex--;
    this.current = this.slides[this.currentIndex];
  }

}
