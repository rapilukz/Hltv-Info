import { CONFIG, loadContent } from '../config';

interface ITeamPlayer {
  fullname: string;
  image: string;
  nickname: string;
  country?: {
    name: string;
    flag: string;
  };
}

interface ITeam {
  id: number;
  name: string;
  logo: string;
  players: ITeamPlayer[];
  coach: string;
  ranking: number;
  averagePlayerAge: number;
}

export async function getTeamByName(name: string): Promise<string> {
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

async function getTeamData(id: string, name: string): Promise<string> {
  const TEAM_URL = `${CONFIG.BASE}/${CONFIG.TEAM}/${id}/${name}`;
  const $ = await loadContent(TEAM_URL);

  const teamProfile = $('.teamProfile');
  if (!teamProfile) return;
  
  return;
}
