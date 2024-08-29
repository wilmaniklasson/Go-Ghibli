import { Film } from '../data/interface';

interface FilmListProps {
  films: Film[];
  loading: boolean;
  favoriteFilms: Film[];
  toggleFavoriteFilm: (film: Film) => void;
  
}

function FilmList({ films, loading, favoriteFilms, toggleFavoriteFilm }: FilmListProps) {
  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <>
      {films.map((film: Film) => {
        const isFavorite = favoriteFilms.some(favFilm => favFilm.id === film.id);

        return (
          <div className='film-list' key={film.id}>
            <img src={film.image} alt={film.title} />
            <div className='film-info'>
              <div className='favorite-film-btn-container'>
              <button className='favorite-film-btn' onClick={() => toggleFavoriteFilm(film)}>
                {isFavorite ? '❤️' : '🩶'}
              </button>
              </div>
              
              <h2>{film.title}</h2>
              <p>Director: {film.director}</p>
              <p>Year of Release: {film.release_date}</p>
              <p>{film.description}</p>
            </div>
          </div>
        );
      })}
    </>
  );
}



export default FilmList;


