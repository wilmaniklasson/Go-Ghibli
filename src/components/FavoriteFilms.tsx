import { Film } from '../data/interface';
import { useState } from 'react';

interface FavoriteFilmsProps {
  favoriteFilms: Film[];
  onShowAllFilms: () => void;
  toggleFavoriteFilm: (film: Film) => void;
}

function FavoriteFilms({ favoriteFilms, toggleFavoriteFilm }: FavoriteFilmsProps) {
  const [filmList, setFilmList] = useState<Film[]>(favoriteFilms);
  const [seenFilms, setSeenFilms] = useState<{ [key: string]: boolean }>({});

  const toggleHaveSeenFilm = (filmId: string) => {
    setSeenFilms(prevState => ({
      ...prevState,
      [filmId]: !prevState[filmId]
    }));
  }

  const moveFilmUp = (index: number) => {
    if (index > 0) {
      const newFilmList = [...filmList];
      const temp = newFilmList[index - 1];
      newFilmList[index - 1] = newFilmList[index];
      newFilmList[index] = temp;
      setFilmList(newFilmList);
    }
  };

  const moveFilmDown = (index: number) => {
    if (index < filmList.length - 1) {
      const newFilmList = [...filmList];
      const temp = newFilmList[index + 1];
      newFilmList[index + 1] = newFilmList[index];
      newFilmList[index] = temp;
      setFilmList(newFilmList);
    }
  };

  return (
    <>
      <h2>Favorite Films</h2>
      {filmList.length === 0 ? (
        <p>No favorite films added yet.</p>
      ) : (
        <div>
          {filmList.map((film, index) => {
            const isFavorite = filmList.some(favFilm => favFilm.id === film.id);
            const hasSeen = seenFilms[film.id] || false;

            return (
              <div className='film-list' key={film.id}>
                <img src={film.image} alt={film.title} />
                <div className='info'>
                  <div className='btn-container'>
                    <button className='have-seen-btn' onClick={() => toggleHaveSeenFilm(film.id)}>
                      {hasSeen ? 'Have seen' : 'Have not seen'}
                    </button>
                    <button className='favorite-film-btn' onClick={() => toggleFavoriteFilm(film)}>
                      {isFavorite ? '❤️' : '🩶'}
                    </button>
                    <div className='move-btn-container'>
                      <button className='move-btn' onClick={() => moveFilmUp(index)} disabled={index === 0}>
                          🔼
                      </button>
                      <button className='move-btn' onClick={() => moveFilmDown(index)} disabled={index === filmList.length - 1}>
                          🔽
                      </button>
                    </div>
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
        </div>
      )}
    </>
  );
}

export default FavoriteFilms;
