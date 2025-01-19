import type { CardPlayer } from "../card/card-player"

export type Packs = {
  id: number,
  name: String,
  description: String,
  content: CardPlayer[]
  price: number
  isOpened: false
}