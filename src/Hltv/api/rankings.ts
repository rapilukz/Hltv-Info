import { CONFIG, loadContent } from '../config';

interface ITeam {
    id: number,
    rankinng: number,
    name: string
}

export async function getTopTeams(): Promise<ITeam[]> {
    const url = `${CONFIG.BASE}/${CONFIG.TEAMS}`

    const $ = await loadContent(url)

    const allContent = $('.ranked-team');
    const teams: ITeam[] = []

    

    return 
}