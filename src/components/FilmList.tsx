import { Film } from '../data/interface';

// Interface props 
interface FilmListProps {
  films: Film[]; // Lista över filmer
  loading: boolean; // Laddar
  favoriteFilms: Film[]; // Lista över favoritfilmer
  toggleFavoriteFilm: (film: Film) => void; // Toggla favoritfilmer
}

// FilmList component
function FilmList({ films, loading, favoriteFilms, toggleFavoriteFilm }: FilmListProps) {
    // Om filmerna fortfarande laddas, visa 'Loading...'
  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <>
    {/* Loopar igenom varje film i films-listan */}
      {films.map((film: Film) => {
        const isFavorite = favoriteFilms.some(favFilm => favFilm.id === film.id);

        return (
          <div className='film-list' key={film.id}>

            <img src={film.image} alt={film.title} />
            
            <div className='info'>
              <div className='favorite-film-btn-container'>
                <button className='favorite-film-btn' onClick={() => toggleFavoriteFilm(film)}>
                  {isFavorite ? '❤️' : '🩶'}
                </button>
              </div>
              
              <div className='film-info'> 
                    <h2>{film.title}</h2>
                    <p>Director: {film.director}</p>
                    <p>Year of Release: {film.release_date}</p>
                    <p>{film.description}</p>
              </div>
            </div>
          </div>
        );
      })}
    </>
  );
}

export default FilmList;


