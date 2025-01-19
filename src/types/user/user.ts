import type { Packs } from "../packs/packs"
import type { UserTeam } from "../team/user-team"

export type User = {
  id: number,
  username: String,
  level: number,
  vutCoins: number,
  vutDollars: number,
  team: UserTeam,
  packs: Packs[]
}