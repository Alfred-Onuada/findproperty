import { IHighlights } from "./highlights";

export interface IProperties{
  title: string,
  description: string,
  image: string[],
  location: string,
  price: number,
  listingType: "Sale" | "Rent",
  highlights: IHighlights
}