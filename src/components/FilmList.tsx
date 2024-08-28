import { Film } from '../data/interface';

interface FilmListProps {
  films: Film[];
  loading: boolean;
}

function FilmList({ films, loading }: FilmListProps) {
  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      {films.map((film: Film) => (
        <div className='film-list' key={film.id}>
          
            <img src={film.image} alt={film.title} />
          
          <div className='film-info'>
            <button>Add to favorites</button>
            <h2>{film.title}</h2>
            <p>Director: {film.director}</p>
            <p>Year of Release: {film.release_date}</p>
            <p>{film.description}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

export default FilmList;
