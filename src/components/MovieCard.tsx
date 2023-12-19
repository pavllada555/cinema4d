// // src/components/MovieCard.tsx
import React from 'react';
import CardComponent from './CardComponent';
import { MovieCardProps } from '@/interfaces';

const MovieCard: React.FC<MovieCardProps> = ({ movie }) => {
  return (
    <CardComponent
      id={movie.id}
      title={movie.title}
      description={`Year: ${movie.year}, Genres: ${movie.genres?.join(', ')}`}
      imgSrc={movie.medium_cover_image}
      backgroundClass={movie.background_image}
    />
  );
};

export default MovieCard;
