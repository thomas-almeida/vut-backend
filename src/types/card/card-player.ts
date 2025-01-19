import type { Agent } from "./player/agent"
import type { Team } from "./player/team"
import type { PlayerStats } from "./player/player-stats"
import type { Country } from "./player/country"

export type CardPlayer = {
  id: number,
  nickName: String,
  name: String,
  vlrUrl: String,
  country: Country,
  team: Team,
  agents: Agent[]
  stats: PlayerStats
}