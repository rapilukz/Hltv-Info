import { CONFIG, USER_AGENT } from '../config';
import { CheerioAPI, load } from 'cheerio';
import fetch from 'node-fetch';

interface IPlayer {
  id: number;
  team: {
    id: number;
    name: string;
  };
  image: string;
  nickname: string;
  name: string;
  age: number;
  rating: number;
  impact: number;
  dpr: number;
  adr: number;
  kast: number;
  kpr: number;
  headshots: number;
  mapsPlayed: number;
}

const BASE_URL: string = `${CONFIG.BASE}/${CONFIG.PLAYERS}`;

export async function getPlayerByName(name: string): Promise<string> {
  const playerId = await getPlayerId(name);
  if (!playerId) return;

  const playerData = getPlayerData(playerId);

  return playerData;
}

export async function getPlayerData(id: string): Promise<string> {
  const PLAYER_URL = `${CONFIG.BASE}/${CONFIG.PLAYERS}/${id}/`;
  const $ = await loadURL(PLAYER_URL);


  return PLAYER_URL;
}

async function getPlayerId(name: string): Promise<string> {
  const $ = await loadURL(BASE_URL);

  const html = $('table.stats-table tbody td.playerCol')
    .filter(function () {
      return $(this).text().indexOf(name) > -1;
    })
    .html();

  if (!html) return;

  const id = html.split('<a')[1].match(/(\d+)/);

  return id[0];
}

async function loadURL(url : string): Promise<CheerioAPI> {
  const content = await (
    await fetch(url, {
      headers: { 'User-Agent': USER_AGENT },
    })
  ).text();

  return load(content);
}
