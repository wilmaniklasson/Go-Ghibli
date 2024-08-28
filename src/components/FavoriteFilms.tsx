function FavoriteFilms({ onShowAllFilms }: { onShowAllFilms: () => void }) {
    return (
      <section>
        <button onClick={onShowAllFilms}>Show all films</button>
        <p>Favorite Films</p>
      </section>
    );
  }
  
  export default FavoriteFilms;
  