import { Film } from '../data/interface';

interface FavoriteFilmsProps {
  favoriteFilms: Film[];
  onShowAllFilms: () => void;
  toggleFavoriteFilm: (film: Film) => void;
}

function FavoriteFilms({ favoriteFilms, toggleFavoriteFilm }: FavoriteFilmsProps) {
  return (
    <>
      <h2>Favorite Films</h2>
      {favoriteFilms.length === 0 ? (
        <p>No favorite films added yet.</p>
      ) : (
        <div>
          {favoriteFilms.map((film) => {
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
        </div>
      )}
    </>
  );
}

export default FavoriteFilms;

