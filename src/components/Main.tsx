import { useState, useEffect } from 'react';
import { getFilms } from '../data/Api';
import { Film } from '../data/interface';
import FilmList from './FilmList';
import FavoriteFilms from './FavoriteFilms';

function Main() {
  const [films, setFilms] = useState<Film[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [buttonClick, setButtonClick] = useState<boolean>(false);
  const [searchFilter, setSearchFilter] = useState<string>('');

  const fetchData = async () => {
    try {
      const data: Film[] = await getFilms();
      data.sort((a, b) => b.release_date.localeCompare(a.release_date));
      setFilms(data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const filteredFilms: Film[] = films.filter((film) =>
    film.title.toLowerCase().startsWith(searchFilter.toLowerCase())
  );

  
// TODO: skapa en funktion som lägg till filmen i favoriter
  
  return (
    <div className="Main">
        <header>
            <h1>Studio Ghibli Films</h1>
                <input className="search" type="text" placeholder="Search..." onChange={(event) => setSearchFilter(event.target.value)}value={searchFilter}/>          
      </header>
     
      <main>
        {buttonClick ? (
          <FavoriteFilms onShowAllFilms={() => setButtonClick(false)} />
        ) : (
          <section>
            <button onClick={() => setButtonClick(true)}>Show favorite films</button>
            <FilmList films={filteredFilms} loading={loading} />
          </section>
        )}
      </main>
    </div>
  );
}

export default Main;
