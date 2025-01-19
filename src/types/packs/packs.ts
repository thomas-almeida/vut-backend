import type { CardPlayer } from "../card/card-player"

type Packs = {
  id: number,
  name: String,
  description: String,
  content: CardPlayer[]
  price: number
  isOpened: false
}

export default Packs