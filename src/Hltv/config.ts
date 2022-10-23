import UserAgent from 'user-agents';
import { CheerioAPI, load } from 'cheerio';
import fetch from 'node-fetch';

const USER_AGENT = new UserAgent().toString();
export const CONFIG = {
  BASE: 'https://www.hltv.org',
  CDN: 'https://img-cdn.hltv.org',
  RESULTS: 'results',
  MATCHES: 'matches',
  PLAYERS: 'stats/players',
  TEAMS: 'ranking/teams',
  TEAM: 'team',
  DATA_FILTER: '?minMapCount=130'
};

export const MAPS = {
  trn: 'Train',
  mrg: 'Mirage',
  d2: 'Dust 2',
  inf: 'Inferno',
  vtg: 'Vertigo',
  ovp: 'Overpass',
  nuke: 'Nuke',
};

export async function loadContent(url: string): Promise<CheerioAPI> {
  const content = await (
    await fetch(url, {
      headers: { 'User-Agent': USER_AGENT },
    })
  ).text();

  return load(content);
}
