import axios from 'axios'
import * as cheerio from 'cheerio'

interface Team {
  name: string
  image: string | null
  players: string[]
}

const vlr = 'https://www.vlr.gg/event/stats/2274/champions-tour-2025-americas-kickoff?exclude=&min_rounds=0&agent=all'
const event = 'https://www.vlr.gg/event/2274/champions-tour-2025-americas-kickoff'

async function scrapTeamsByLeague(url: string) {
  try {
    const { data } = await axios.get(url)
    const $ = cheerio.load(data)

    const rows = $(".event-teams-container")
    const teams: Team[] = []

    rows.each((_, row) => {
      const teamCard = $(row).find(".wf-card.event-team")

      teamCard.each((_, cell) => {
        // Nome do time
        const teamName = $(cell).find(".event-team-name").text().trim()

        // URL da imagem do time
        const teamImage = $(cell).find(".event-team-players-mask img").attr("src")
        const imageURL = teamImage ? `https:${teamImage}` : null

        // Jogadores do time
        const players: string[] = []
        $(cell)
          .find(".event-team-players-item")
          .each((_, player) => {
            const playerName = $(player).text().trim()
            players.push(playerName)
          })

        // Criar objeto do time
        const team: Team = {
          name: teamName,
          image: imageURL,
          players,
        }

        // Adicionar time à lista
        teams.push(team)
      })
    })

    console.log(teams)
  } catch (error) {
    console.error("Erro ao buscar os dados:", error)
    return []
  }
}

async function scrapPage(url: string) {
  try {

    const { data } = await axios.get(url)
    const $ = cheerio.load(data)

    const rows = $('table tbody tr')

    rows.each(async (i, row) => {
      const rowData: string[] = []

      $(row).find('td').each((j, cell) => {
        rowData.push($(cell).text().trim())
      })

      if (rowData.length >= 18) {
        const nameWithTeam = rowData[0].split(/\s+/)
        const name = nameWithTeam.slice(0, -1).join(' ')
        const team = nameWithTeam.slice(-1).join(' ')

        const playerLink = $(row).find('a[href^="/player"]').attr('href')
        const countryClass = $(row).find('i.flag').attr('class')?.split(' ').pop()
        const mainAgent = $(row).find('.mod-agents div :nth-child(1)').attr('src')

        const playerData = {
          name: name,
          team: team,
          playerLink: `https://www.vlr.gg${playerLink}`,
          mainAgent: `https://www.vlr.gg${mainAgent}`,
          country: `https://www.vlr.gg/img/icons/flags/16/${countryClass?.replace('mod-', '')}.png`,
          rating: parseFloat(rowData[3]) || 0,
          acs: parseFloat(rowData[4]) || 0,
          kd: parseFloat(rowData[5]) || 0,
          kast: parseInt(rowData[6].replace('%', '')),
          adr: parseFloat(rowData[7]) || 0,
          kpr: parseFloat(rowData[8]) || 0,
          apr: parseFloat(rowData[9]) || 0,
          fkpr: parseFloat(rowData[10]) || 0,
          fdpr: parseFloat(rowData[11]) || 0,
          hsrate: parseInt(rowData[12].replace('%', '')),
          clutchrate: parseInt(rowData[13].replace('%', ''))
        }

        console.log(playerData)
      }
    })

  } catch (err) {
    console.error('Erro ao fazer o scrape:', err)
  }
}


//scrapTeamsByLeague(event)
scrapPage(vlr)