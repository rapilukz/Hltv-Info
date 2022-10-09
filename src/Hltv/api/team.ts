import { CONFIG, loadContent } from '../config';

interface IPlayer {
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
  players: IPlayer[];
  coach: string;
  ranking: number;
  averagePlayerAge: number;
}

const BASE_URL = `${CONFIG.BASE}/${CONFIG.TEAM}`


export async function getTeamByName(name: string ) /* : Promise<ITeam> */ {
    
} 

async function getTeamId(name: string) {
    
}

async function getTeamData(id: string){
    const $ = await loadContent(BASE_URL);
}