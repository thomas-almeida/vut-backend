import axios from 'axios'
import * as cheerio from 'cheerio'

const vlr = 'https://www.vlr.gg/stats/?event_group_id=all&event_id=all&region=all&min_rounds=200&min_rating=1550&agent=all&map_id=all&timespan=90d'

async function scrapPage(url: string) {
  try {
    // Faz a requisição para a página
    const { data } = await axios.get(url)
    // Carrega o HTML com o cheerio
    const $ = cheerio.load(data)

    // Seleciona a tabela
    const rows = $('table tbody tr') // Cada linha de dados na tabela

    rows.each(async (i, row) => {
      const rowData: string[] = []

      // Itera pelas células <td> da linha
      $(row).find('td').each((j, cell) => {
        rowData.push($(cell).text().trim())
      })

      // Verifica se a linha contém dados suficientes
      if (rowData.length >= 18) {
        // Separando o nome e o time
        const nameWithTeam = rowData[0].split(/\s+/) // Divide pela quebra de espaço ou nova linha
        const name = nameWithTeam.slice(0, -1).join(' ') // Junta todos os elementos exceto o último para formar o nome
        const team = nameWithTeam.slice(-1).join(' ') // O último elemento é o time

        const playerLink = $(row).find('a[href^="/player"]').attr('href')
        const countryClass = $(row).find('i.flag').attr('class')?.split(' ').pop()

        const playerData = {
          name: name,
          team: team,
          playerLink: `https://www.vlr.gg${playerLink}`,
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

scrapPage(vlr)
