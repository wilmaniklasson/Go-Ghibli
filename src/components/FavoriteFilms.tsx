import { Film } from '../data/interface';
import { useState } from 'react';

// Interface props 
interface FavoriteFilmsProps {
  favoriteFilms: Film[]; // Lista över favoritfilmer
  onShowAllFilms: () => void; // Visa alla filmer
  toggleFavoriteFilm: (film: Film) => void; // Toggla favoritfilmer
}

function FavoriteFilms({ favoriteFilms, toggleFavoriteFilm }: FavoriteFilmsProps) {
  // State hook för att hålla koll på favoritfilmer
  const [filmList, setFilmList] = useState<Film[]>(favoriteFilms);
  // State hook för att hålla koll på vilka filmer som har setts
  const [seenFilms, setSeenFilms] = useState<{ [key: string]: boolean }>({});

  // Toggle have seen film
  const toggleHaveSeenFilm = (filmId: string) => {
    setSeenFilms(prevState => ({
      ...prevState,
      [filmId]: !prevState[filmId]
    }));
  }

  // Move film up
  const moveFilmUp = (index: number) => {
    if (index > 0) {
      const newFilmList = [...filmList];
      const temp = newFilmList[index - 1];
      newFilmList[index - 1] = newFilmList[index];
      newFilmList[index] = temp;
      setFilmList(newFilmList); // Uppdaterar filmList
    }
  };

  // Move film down
  const moveFilmDown = (index: number) => {
    if (index < filmList.length - 1) {
      const newFilmList = [...filmList];
      const temp = newFilmList[index + 1];
      newFilmList[index + 1] = newFilmList[index];
      newFilmList[index] = temp;
      setFilmList(newFilmList); // Uppdaterar filmList
    }
  };

  return (
    <>
      <h2>Favorite Films</h2>
      {filmList.length === 0 ? (
        // Meddelande om det inte finns några favoritfilmer
        <p>No favorite films added yet.</p>
      ) : (
        <div>
          {/* Loopar igenom varje film i filmList */}
          {filmList.map((film, index) => {
            const isFavorite = filmList.some(favFilm => favFilm.id === film.id);
            const hasSeen = seenFilms[film.id] || false;

            return (
              <div className='film-list' key={film.id}>
                {/* Bild */}
                <img src={film.image} alt={film.title} />
                <div className='info'>
                  <div className='btn-container'>
                    {/* button have sen? */}
                    <button className='have-seen-btn' onClick={() => toggleHaveSeenFilm(film.id)}>
                      {hasSeen ? 'Have seen' : 'Have not seen'}
                    </button>
                       {/* button favorite film */}
                    <button className='favorite-film-btn' onClick={() => toggleFavoriteFilm(film)}>
                      {isFavorite ? '❤️' : '🩶'}
                    </button>
                    <div className='move-btn-container'>
                      {/* button move up */}
                      <button className='move-btn' onClick={() => moveFilmUp(index)} disabled={index === 0}>
                          🔼
                      </button>
                      {/* button move down */}
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
