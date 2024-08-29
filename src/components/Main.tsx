import { useState, useEffect } from 'react';
import { getFilms } from '../data/Api';
import { Film } from '../data/interface';
import FilmList from './FilmList';
import FavoriteFilms from './FavoriteFilms';

function Main() {
  const [films, setFilms] = useState<Film[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [showFavorites, setShowFavorites] = useState<boolean>(false);
  const [searchFilter, setSearchFilter] = useState<string>('');
  const [favoriteFilms, setFavoriteFilms] = useState<Film[]>([]);

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

  
  const toggleFavoriteFilm = (film: Film) => {
    if (favoriteFilms.some(favFilm => favFilm.id === film.id)) {
      setFavoriteFilms(favoriteFilms.filter(favFilm => favFilm.id !== film.id));
    } else {
      setFavoriteFilms([...favoriteFilms, film]);
    }
  };
  

const toggleView = () => {
  setShowFavorites(!showFavorites); 
};
  
  return (
    <div className="page">
        <header>
            <h1>Studio Ghibli Films</h1>
                <input className="search" type="text" placeholder="Search..." onChange={(event) => setSearchFilter(event.target.value)}value={searchFilter}/>          
      </header>
     
      <main>
        <button className='toggle-view-btn' onClick={toggleView}>
          {showFavorites ? 'Show all films' : 'Show favorite films'}
        </button>
        
        {showFavorites ? (
          <FavoriteFilms 
            favoriteFilms={favoriteFilms} 
            onShowAllFilms={toggleView} 
            toggleFavoriteFilm={toggleFavoriteFilm}
          />
        ) : (
          <section>
            <FilmList 
              films={filteredFilms} 
              loading={loading} 
              favoriteFilms={favoriteFilms}
              toggleFavoriteFilm={toggleFavoriteFilm}
            />
          </section>
        )}
      </main>
    </div>
  );
}

export default Main;
