import { CONFIG, loadContent } from '../config';

export interface IPlayer {
  id: string;
  team: string;
  image: string;
  nickname: string;
  name: string;
  fullName: string;
  kast: number 
  age: number;
  country: string;
  rating: number;
  impact: number;
  adr: number;
  kpr: number;
  headshots: number;
  url: string;
}

const BASE_URL: string = `${CONFIG.BASE}/${CONFIG.PLAYERS}`;

export async function getPlayerByName(name: string): Promise<IPlayer> {
  const playerId = await getPlayerId(name);
  if (!playerId) return;

  const playerData = getPlayerData(playerId, name);
  if (!playerData) return;

  return playerData;
}

export async function getPlayerData(id: string, nickname: string): Promise<IPlayer> {
  const PLAYER_URL = `${CONFIG.BASE}/${CONFIG.PLAYERS}/${id}/${nickname}`;
  const $ = await loadContent(PLAYER_URL);

  const mainTable = $('.playerSummaryStatBox');
  if (!mainTable.html()) return;

  const imageBlock = mainTable.find('.summaryBodyshotContainer');
  const image = imageBlock.children('img').last().attr('src') as string;
  const fullName = imageBlock.children('img').last().attr('title');

  const mainTableContent = mainTable.find('.summaryBreakdownContainer');

  const playerName = mainTableContent.find('.summaryRealname').text().trim();
  const teamName = mainTableContent.find('.SummaryTeamname').text();

  const age = parseInt(mainTableContent.find('.summaryPlayerAge').text(), 10);

  const statRow1 = mainTableContent.find('.summaryStatBreakdownRow').eq(0).find('.summaryStatBreakdown');

  const rating = parseFloat(statRow1.eq(0).find('.summaryStatBreakdownDataValue').text());

  const statRow2 = mainTableContent.find('.summaryStatBreakdownRow').eq(1).find('.summaryStatBreakdown');

  const impact = parseFloat(statRow2.eq(0).find('.summaryStatBreakdownDataValue').text());
  const adr = parseFloat(statRow2.eq(1).find('.summaryStatBreakdownDataValue').text());
  const kpr = parseFloat(statRow2.eq(2).find('.summaryStatBreakdownDataValue').text());
  const kast = parseFloat(statRow1.eq(2).find('.summaryStatBreakdownDataValue').text())

  const additionalStats = $('.statistics .columns .col');
  const headshots = parseFloat(additionalStats.eq(0).children('.stats-row').eq(1).children('span').eq(1).text());

  const country = mainTableContent.find('.summaryRealname').find('img').attr('alt')

  return {
    id,
    team: teamName,
    image,
    fullName,
    nickname,
    name: playerName,
    age,
    kast,
    country,
    rating,
    impact,
    adr,
    kpr,
    headshots,
    url: PLAYER_URL,
  };
}

async function getPlayerId(name: string): Promise<string> {
  const $ = await loadContent(BASE_URL);

  const html = $('table.stats-table tbody td.playerCol')
    .filter(function () {
      return $(this).text().indexOf(name) > -1;
    })
    .html();

  if (!html) return;

  const id = html.split('<a')[1].match(/(\d+)/);

  return id[0];
}

