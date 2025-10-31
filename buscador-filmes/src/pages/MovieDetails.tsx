import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getMovieDetails } from '../services/api';
import { type Movie } from '../types';

export default function MovieDetails() {
  const { id } = useParams();
  const [movie, setMovie] = useState<Movie>();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMovie = async () => {
      const data = await getMovieDetails(id ? id.toString() : '');
      setMovie(data);
    };
    fetchMovie();
  }, [id]);

  if (!movie) return <div>Carregando...</div>;
  if (!movie.Title) return <div>Filme não encontrado...</div>;

  return (
    <div className="MovieDetails">
      {/* Botão de voltar */}
      <button className="back-button" onClick={() => navigate(-1)}>
        ← Voltar
      </button>

      <div className="movie-content">
        <img src={movie.Poster} alt={movie.Title} />
        <div className="movie-info">
          <h1>{movie.Title}</h1>
          <p><strong>Ano:</strong> {movie.Year}</p>
          <p><strong>Diretor:</strong> {movie.Director}</p>
          <p><strong>Elenco:</strong> {movie.Actors}</p>
          <p><strong>Gênero:</strong> {movie.Genre}</p>
          <p><strong>Enredo:</strong> {movie.Plot}</p>
        </div>
      </div>
    </div>
  );
}
