import { IHighlights } from "./highlights";
import { IHomeCarousel } from "./homecarousel";

export interface IProperties{
  _id: string,
  title: string,
  description: string,
  images: IHomeCarousel[],
  location: string,
  price: number,
  listingType: "Sale" | "Rent",
  highlights: IHighlights,
  sellerId: string
}