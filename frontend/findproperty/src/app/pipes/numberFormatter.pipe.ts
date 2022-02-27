import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: 'formatNumber'
})
export class formatNumber implements PipeTransform{
  transform(value: number): string {
    if (value < 1000) {
      return value.toString() + "+";
    } else if (value < 1000000) {
      return Math.floor((value / 1000)).toString() + "K+";
    } else if (value < 1000000000) {
      return Math.floor((value / 1000000)).toString() + "M+";
    } else {
      return Math.floor(value).toString() + "+";
    }
  }
}