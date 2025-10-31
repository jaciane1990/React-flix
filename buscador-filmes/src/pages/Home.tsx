import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { searchMovies } from '../services/api';
import { type Movie } from '../types.ts';

export default function Home() {
  const [query, setQuery] = useState('');
  const [movies, setMovies] = useState<Movie[]>([]);
  const navigate = useNavigate();

  const handleSearch = async (e:React.FormEvent) => {
    e.preventDefault();
    const results = await searchMovies(query);
    setMovies(results);
  };

  const scrollCarousel = (direction: 'left' | 'right') => {
  const container = document.querySelector('.movie-carousel');
  if (container) {
    const scrollAmount = direction === 'left' ? -300 : 300;
    container.scrollBy({ left: scrollAmount, behavior: 'smooth' });
  }
};

return (
  <div className="Home">
    <h1>Buscador de Filmes</h1>

    <form onSubmit={handleSearch}>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Digite o nome do filme..."
      />
      <button type="submit">Buscar</button>
    </form>

    {movies.length > 0 && (
      <div className="carousel-container">
  <h2>Resultados da busca</h2>
  <div className="carousel-wrapper">
    <button className="scroll-btn left" onClick={() => scrollCarousel('left')}>‹</button>
    <div className="movie-carousel">
      {movies.map((movie) => (
        <div
          key={movie.imdbID}
          className="movie-card"
          onClick={() => navigate(`/movie/${movie.imdbID}`)}
        >
          <img src={movie.Poster} alt={movie.Title} />
          <h3>{movie.Title}</h3>
        </div>
      ))}
    </div>
    <button className="scroll-btn right" onClick={() => scrollCarousel('right')}>›</button>
  </div>
</div>

    )}
  </div>
);
}