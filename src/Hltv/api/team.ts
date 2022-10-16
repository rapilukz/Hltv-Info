import { Cheerio, CheerioAPI, Element } from 'cheerio';
import { CONFIG, loadContent } from '../config';

interface IPlayer {
  id: string;
  fullname: string;
  nickname: string;
  country: string;
}

export interface ITeam {
  name: string;
  logo: string;
  players: IPlayer[];
  coach: string;
  ranking: number;
  averagePlayerAge: number;
  url: string
}

export async function getTeamByName(name: string): Promise<ITeam> {
  const teamId = await getTeamId(name);
  
  if (!teamId) return;

  const teamData = await getTeamData(teamId, name);
  if (!teamData) return;
  
  return teamData;
}

async function getTeamId(name: string): Promise<string> {
  const BASE_URL = `${CONFIG.BASE}/${CONFIG.TEAMS}${CONFIG.DATA_FILTER}`;
  const $ = await loadContent(BASE_URL);
  try {
    const id = $('.stats-table tbody td.teamCol-teams-overview')
      .filter(function () {
        return $(this).text().indexOf(name) > -1;
      })
      .find('a')
      .attr('href')
      .split('/')[3];

    return id;
  } catch (e) {
    return;
  }
}

async function getTeamData(id: string, name: string): Promise<ITeam> {
  const TEAM_URL = `${CONFIG.BASE}/${CONFIG.TEAM}/${id}/${name}`;
  const $ = await loadContent(TEAM_URL);

  const teamProfile = $('.teamProfile');
  if (!teamProfile) return;

  const lineup = teamProfile.find('.bodyshot-team').children();
  const players = getPlayers($, lineup);

  const teamName = teamProfile.find('.profile-team-name').text();
  const logo = teamProfile.find('.teamlogo').attr('src') as string;

  const statsContainer = teamProfile.find('.profile-team-stats-container').children();
  const ranking = Number(statsContainer.eq(0).find('.right').text().replace('#', ''));
  const averagePlayerAge = Number(statsContainer.eq(2).find('.right').text());
  const coach = statsContainer.eq(3).find('.right').text().trim();

  return {
    name: teamName,
    logo,
    ranking,
    coach,
    averagePlayerAge,
    players,
    url: TEAM_URL,
  };
}

function getPlayers($: CheerioAPI, lineup: Cheerio<Element>): IPlayer[] {
  const players: IPlayer[] = [];

  lineup.each((i, el) => {
    const player = $(el);
    const countryName = player.find('.flag').attr('title') as string

    players.push({
      fullname: player.find('img').attr('title') as string,
      nickname: player.attr('title') as string,
      id: player.attr('href').split('/')[2] as string,
      country: countryName,
    });
  });

  return players;
}
