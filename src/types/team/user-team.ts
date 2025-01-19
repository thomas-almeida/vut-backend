import type { CardPlayer } from "../card/card-player"

export type UserTeam = {
  ownerId: number,
  name: String,
  pictureUrl: String,
  startingLineUp: CardPlayer[],
  reserveLineUp: CardPlayer[]
}