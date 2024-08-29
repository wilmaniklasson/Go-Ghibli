import { Film } from '../data/interface';

interface FavoriteFilmsProps {
  favoriteFilms: Film[];
  onShowAllFilms: () => void;
}

function FavoriteFilms({ favoriteFilms }: FavoriteFilmsProps) {
  return (
    <section>
      
      <h2>Favorite Films</h2>
      {favoriteFilms.length === 0 ? (
        <p>No favorite films added yet.</p>
      ) : (
        <div>
          {favoriteFilms.map((film) => (
            <div className='film-list' key={film.id}>
              <img src={film.image} alt={film.title} />
              <div className='film-info'>
                <h2>{film.title}</h2>
                <p>Director: {film.director}</p>
                <p>Year of Release: {film.release_date}</p>
                <p>{film.description}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}

export default FavoriteFilms;
