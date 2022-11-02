import { CONFIG, loadContent } from '../config';

export interface ITeam {
  id: number;
  ranking: number;
  name: string;
}

export async function getTopTeams(): Promise<ITeam[]> {
  const url = `${CONFIG.BASE}/${CONFIG.TEAMS}`;

  const $ = await loadContent(url);

  const allContent = $('.ranked-team');
  const teams: ITeam[] = [];

  allContent.map((_i, element) => {
    const el = $(element);

    const id = Number((el.find('.moreLink').attr('href') as string).split('/')[2]);
    const ranking = parseInt(el.find('.position').text().replace('#', ''), 10);
    const name = el.find('.teamLine').find('.name').text();

    const response: ITeam = {
        id, 
        ranking,
        name
    }

    teams[teams.length] = response  
  });

  return teams;
}
