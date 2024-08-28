import { Film } from '../data/interface';
async function getFilms(): Promise<Film[]> {
    const response: Response = await fetch('https://ghibliapi.vercel.app/films');
    const data: Film[] = await response.json(); 
    return data;
}

export { getFilms };
