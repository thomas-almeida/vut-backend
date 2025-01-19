import type { CardPlayer } from "../card/card-player"

type UserTeam = {
  ownerId: number,
  name: String,
  pictureUrl: String,
  startingLineUp: CardPlayer[],
  reserveLineUp: CardPlayer[]
}

export default UserTeam